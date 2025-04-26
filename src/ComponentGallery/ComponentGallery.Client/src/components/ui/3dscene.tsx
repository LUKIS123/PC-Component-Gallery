import SceneInit from "@/lib/SceneInit";
import { useEffect } from "react";

import * as THREE from "three";

import { EXRLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

function Scene() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.animate();

    const exrLoader = new EXRLoader();
    // struktura url: api/assets/backgrounds/{backgroundID}, narazie mamy tylko 1 i bez tabelki w bazie
    exrLoader.load("/api/assents/backgrounds/1", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      test.scene.environment = texture;
      // test.scene.background = texture;
    });

    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      "/api/assents/components/1/main", // struktura url: api/assets/components/{componentID}/{cokolwiek}, zwraca gltf z odniesieniem do tekstur
      (gltfScene) => {
        gltfScene.scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.material.transparent = true;
            node.material.alphaTest = 0.6;
            node.material.needsUpdate = true;
          }
        });
        test.scene.add(gltfScene.scene);
      },
      undefined,
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
