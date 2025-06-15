import SceneInit from "@/lib/SceneInit";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as THREE from "three";
import { EXRLoader, GLTFLoader, DRACOLoader } from "three/examples/jsm/Addons.js";

function Scene() {
  const { componentId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");

    // Prepare loaders
    const exrLoader = new EXRLoader();
    const gltfLoader = new GLTFLoader();

    // Optional: Enable DRACO compression for GLTF
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/'); // Set path to DRACO decoder
    gltfLoader.setDRACOLoader(dracoLoader);

    const exrPromise = new Promise<THREE.Texture>((resolve, reject) => {
      exrLoader.load(
        `/api/assents/backgrounds/1`,
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          resolve(texture);
        },
        undefined,
        reject
      );
    });

    const gltfPromise = new Promise<any>((resolve, reject) => {
      gltfLoader.load(
        `/api/assents/components/${componentId}/main`,
        (gltf) => resolve(gltf),
        undefined,
        reject
      );
    });

    Promise.all([exrPromise, gltfPromise])
      .then(([texture, gltf]) => {
        test.scene.environment = texture;

        gltf.scene.traverse((node: { material: { needsUpdate: boolean; }; }) => {
          if (node instanceof THREE.Mesh) {
            node.material.needsUpdate = true;
          }
        });

        const mainScene = gltf.scene;
        const box = new THREE.Box3().setFromObject(mainScene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        mainScene.position.sub(center);

        test.setCameraSettings(box, false);
        test.camera.lookAt(center);
        test.camera.updateProjectionMatrix();
        test.scene.add(mainScene);

        test.render();
        test.animate();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading assets:", error);
        setLoading(false);
      });

    // Cleanup if needed
    return () => {
      // Dispose resources if SceneInit supports it
    };
  }, [componentId]);

  return (
    <div id="canvasDiv" style={{ height: "100%", width: "100%" }}>
      {loading && (
        <div
          style={{
            position: "relative",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            background: "#2228",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div style={{
            border: "8px solid #f3f3f3",
            borderTop: "8px solid #14204a",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite"
          }} />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          Loading 3D Model...
        </div>
      )}
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
export default Scene;