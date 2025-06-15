import SceneInit from "@/lib/SceneInit";
import { useEffect } from "react";
import { useParams } from "react-router";

import * as THREE from "three";

import { EXRLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

function Scene() {
  const { componentId } = useParams();

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");

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
        });

        const mainScene = gltf.scene;

        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);

        mainScene.position.sub(center); // Przesunięcie sceny do środka

        test.setCameraSettings(new THREE.Box3().setFromObject(mainScene), false);


        test.camera.lookAt(center);
        test.camera.updateProjectionMatrix();
        test.scene.add(mainScene);
        test.render();
        test.animate();
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
