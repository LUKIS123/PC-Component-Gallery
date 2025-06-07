import SceneInit from "@/lib/SceneInit";
import { useEffect } from "react";
import { useParams } from "react-router";

import * as THREE from "three";

import { EXRLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

function Scene() {
  const { pcBuildId } = useParams();
  const caseComponentName = "CASE";
  const ramComponentName = "RAM";
  const cpuComponentName = "CPU";
  const motherboardComponentName = "MB";
  const gpuComponentName = "GPU";

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.animate();

    const exrLoader = new EXRLoader();
    exrLoader.load(`/api/assents/backgrounds/1`, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      test.scene.environment = texture;
      // test.scene.background = texture;
    });

    const gltfLoader = new GLTFLoader();
    let caseModel, motherboard, cpu, ram, gpu;

    gltfLoader.load(
      `/api/assents/pcbuilds/${pcBuildId}/main`,
      (gltf) => {
        gltf.scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.material.needsUpdate = true;
          }
          if (node instanceof THREE.Object3D && !node.parent) {
            gltf.scene.add(node);
          }
        });

        const mainScene = gltf.scene;
        // Znajdź podmodel po nazwie
        caseModel = mainScene.getObjectByName(caseComponentName);
        motherboard = mainScene.getObjectByName(motherboardComponentName);
        cpu = mainScene.getObjectByName(cpuComponentName);
        ram = mainScene.getObjectByName(ramComponentName);
        gpu = mainScene.getObjectByName(gpuComponentName);

        if (!caseModel || !ram || !cpu || !motherboard || !gpu) {
          console.warn(
            "Nie znaleziono wszystkich wymaganych komponentów w modelu."
          );
        }

        // Podmiana komponentów
        const oldComponent = ram;
        replaceComponent(
          gltfLoader,
          caseModel,
          oldComponent,
          "/api/assents/components/4/main",
          motherboard,
          cpu,
          ram,
          gpu
        );

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
  }, [pcBuildId]);

  return (
    <div id="canvasDiv" style={{ height: "100%", width: "100%" }}>
      <canvas id="myThreeJsCanvas"></canvas>
    </div>
  );
}
export default Scene;

// 2. Funkcja do podmiany komponentu
function replaceComponent(
  loader,
  parent,
  oldComponent,
  newComponentGLBPath,
  motherboard,
  cpu,
  ram,
  gpu
) {
  // Załaduj nowy model komponentu
  loader.load(
    newComponentGLBPath,
    (gltf) => {
      const newComponent = gltf.scene;
      newComponent.name = oldComponent.name; // Zachowaj nazwę starego komponentu

      console.log("Załadowano nowy komponent:", newComponent);
      console.log("Stary komponent:", oldComponent);
      console.log("Nowy komponent GLB Path:", newComponentGLBPath);
      console.log("Nowy załadowany ale gltf?:", gltf);

      // Zachowaj transformacje starego komponentu
      newComponent.position.copy(oldComponent.position);
      newComponent.rotation.copy(oldComponent.rotation);
      newComponent.scale.copy(oldComponent.scale);

      // Usuń stary komponent
      parent.remove(oldComponent);
      oldComponent.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      // Dodaj nowy komponent do rodzica
      parent.add(newComponent);

      // Aktualizuj referencję (opcjonalnie, jeśli chcesz dalej nią sterować)
      if (oldComponent === motherboard) motherboard = newComponent;
      else if (oldComponent === cpu) cpu = newComponent;
      else if (oldComponent === ram) ram = newComponent;
      else if (oldComponent === gpu) gpu = newComponent;
      console.log("Podmieniono komponent:", newComponent);
    },
    undefined,
    (error) => {
      console.error("Błąd podczas ładowania nowego komponentu:", error);
    }
  );
}

// Test funkcji replaceComponent
function replaceComponentTEST(loader, parent, oldComponent, newGLB) {
  // 1️⃣  zapisz GLOBALNĄ (światową) transformację starego RAM-u
  const worldPos = new THREE.Vector3();
  const worldQuat = new THREE.Quaternion();
  const worldScale = new THREE.Vector3();

  oldComponent.getWorldPosition(worldPos);
  oldComponent.getWorldQuaternion(worldQuat);
  oldComponent.getWorldScale(worldScale);

  // 2️⃣  wyrzuć stary model z rodzica i zwolnij zasoby
  parent.remove(oldComponent);
  oldComponent.traverse((n) => {
    if (n.geometry) n.geometry.dispose();
    if (n.material) {
      Array.isArray(n.material)
        ? n.material.forEach((m) => m.dispose())
        : n.material.dispose();
    }
  });

  // 3️⃣  załaduj nowy model
  loader.load(newGLB, (gltf) => {
    /** nowy obiekt, zwykle całe gltf.scene albo jego pierwszy mesh */
    const newComp = gltf.scene;
    newComp.name = oldComponent.name; // zachowaj nazwę (np. "RAM")

    // 4️⃣  nadaj mu TĘ SAMĄ globalną transformację
    newComp.position.copy(worldPos);
    newComp.quaternion.copy(worldQuat);
    newComp.scale.copy(worldScale);

    // zamroź macierz, żeby od razu zadziałało
    newComp.updateMatrix();
    newComp.matrixAutoUpdate = false;

    // 5️⃣  dodaj do TEGO SAMEGO rodzica
    parent.add(newComp);

    // odswiezanie macierzy świata
    newRam.updateWorldMatrix(true, true);
    parent.updateWorldMatrix(true, true);
  });
}
