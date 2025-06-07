import SceneInit from "@/lib/SceneInit";
import { useEffect } from "react";
import { useParams } from "react-router";

import * as THREE from "three";

import { EXRLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

function Scene() {
  const { componentId } = useParams();

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.animate();

    const exrLoader = new EXRLoader();
    // struktura url: api/assets/backgrounds/{backgroundID}, narazie mamy tylko 1 i bez tabelki w bazie
    exrLoader.load(`/api/assents/backgrounds/1`, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      test.scene.environment = texture;
      // test.scene.background = texture;
    });

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      `/api/assents/components/${componentId}/main`, // struktura url: api/assets/components/{componentID}/{cokolwiek}, zwraca gltf z odniesieniem do tekstur
      (gltf) => {
        gltf.scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.material.needsUpdate = true;
          }
          if (node instanceof THREE.Object3D && !node.parent) {
            gltf.scene.add(node);
          }
        });

        // Compute the bounding box of the loaded model
        const box = new THREE.Box3().setFromObject(gltf.scene);

        // Get the center and size of the bounding box
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        // Adjust the camera position based on the model's size
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = test.camera.fov * (Math.PI / 180); // Convert FOV to radians
        const cameraDistance = maxDim / (2 * Math.tan(fov / 2)); // Distance to fit the model
        test.camera.position.set(
          center.x,
          center.y + maxDim,
          center.z + cameraDistance
        );

        // Ensure the camera looks at the center of the model
        test.camera.lookAt(center);
        test.camera.updateProjectionMatrix();

        test.scene.add(gltf.scene);
      },
      // onProgress callback
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded gltf model");
      },
      (error) => {
        console.error("An error happened while loading the GLTF model:", error);
      }
    );
  }, []);

  return (
    <div id="canvasDiv" style={{ height: "100%", width: "100%" }}>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
export default Scene;
