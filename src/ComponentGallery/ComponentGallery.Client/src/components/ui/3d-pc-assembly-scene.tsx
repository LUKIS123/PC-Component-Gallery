import SceneInit from "@/lib/SceneInit";
import { useEffect } from "react";
import { useParams } from "react-router";

import * as THREE from "three";

import { EXRLoader, GLTFLoader } from "three/examples/jsm/Addons.js";

function Scene() {
  const { pcBuildId } = useParams();

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
    let caseModel, motherboard, cpu, ram;

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

        let scenaIChuj = gltf.scene;
        // Znajdź podmodel po nazwie
        caseModel = scenaIChuj.getObjectByName("Case");
        motherboard = scenaIChuj.getObjectByName("Motherboard");
        cpu = scenaIChuj.getObjectByName("CPU");
        ram = scenaIChuj.getObjectByName("RAM");

        if (!caseModel || !ram) {
          console.warn("Model lub RAM nie jest jeszcze załadowany.");
          return;
        }
        console.log("Załadowano model:", caseModel);
        console.log("Załadowano RAM:", ram);
        console.log("Załadowano CPU:", cpu);
        console.log("Załadowano Motherboard:", motherboard);
        // Podmiana komponentów
        replaceComponent(
          caseModel,
          ram,
          "/api/assents/components/4/main",
          motherboard,
          cpu,
          ram
        );

        // I podmiana:
        // replaceComponent4(
        //   gltfLoader,
        //   caseModel,
        //   ram,
        //   "/api/assents/components/4/main",
        // );
        console.log("Podmieniono RAM na nowy model.");

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

// 2. Funkcja do podmiany komponentu
function replaceComponent(
  parent,
  oldComponent,
  newComponentGLBPath,
  motherboard,
  cpu,
  ram
) {
  // Załaduj nowy model komponentu
  const loader = new GLTFLoader();
  loader.load(newComponentGLBPath, (gltf) => {
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
  });
}

// function replaceComponent2(
//   parent,
//   oldComponent,
//   newComponentGLBPath,
//   motherboard,
//   cpu,
//   ram
// ) {
//   if (!oldComponent || !oldComponent.parent) {
//     console.error("Stary komponent nie istnieje lub nie ma rodzica");
//     return;
//   }

//   // Zapamiętaj bezpośredniego rodzica starego komponentu
//   const actualParent = oldComponent.parent;

//   // Zapamiętaj pozycję w świecie przed usunięciem
//   const worldPosition = new THREE.Vector3();
//   const worldQuaternion = new THREE.Quaternion();
//   const worldScale = new THREE.Vector3();

//   oldComponent.getWorldPosition(worldPosition);
//   oldComponent.getWorldQuaternion(worldQuaternion);
//   oldComponent.getWorldScale(worldScale);

//   // Załaduj nowy model komponentu
//   const loader = new GLTFLoader();
//   loader.load(newComponentGLBPath, (gltf) => {
//     // Używamy pierwszego dziecka sceny zamiast całej sceny
//     const newComponent = gltf.scene;

//     // Najpierw usuń stary komponent z jego bezpośredniego rodzica
//     actualParent.remove(oldComponent);

//     // Zwolnij zasoby starego komponentu
//     oldComponent.traverse((child) => {
//       if (child.geometry) child.geometry.dispose();
//       if (child.material) {
//         if (Array.isArray(child.material)) {
//           child.material.forEach((mat) => mat.dispose());
//         } else {
//           child.material.dispose();
//         }
//       }
//     });

//     // Dodaj nowy komponent do tego samego rodzica co stary
//     actualParent.add(newComponent);

//     // Ustaw globalną transformację dla nowego komponentu
//     newComponent.position.set(0, 0, 0);
//     newComponent.quaternion.identity();
//     newComponent.scale.set(1, 1, 1);

//     newComponent.position.copy(worldPosition);
//     newComponent.quaternion.copy(worldQuaternion);
//     newComponent.scale.copy(worldScale);

//     console.log("Podmieniono komponent:", newComponent);

//     // Aktualizuj referencje w nadrzędnej funkcji za pomocą zwracania nowych wartości
//     if (oldComponent === ram) {
//       // Aktualizuj referencję w głównej funkcji
//       window.scene_ram = newComponent;
//     }
//   });
// }

// function replaceComponent3(
//   parent,
//   oldComponent,
//   newComponentGLBPath,
//   motherboard,
//   cpu,
//   ram
// ) {
//   // Znajdź faktycznego rodzica starego komponentu
//   const actualParent = oldComponent.parent;

//   if (!actualParent) {
//     console.error("Nie znaleziono rodzica dla starego komponentu");
//     return;
//   }

//   // Zapisz pozycję, rotację i skalę oryginalnego komponentu
//   const originalMatrix = oldComponent.matrix.clone();
//   const originalPosition = new THREE.Vector3();
//   const originalRotation = new THREE.Euler();
//   const originalScale = new THREE.Vector3();

//   oldComponent.updateMatrixWorld(true); // Upewnij się, że macierz świata jest aktualna
//   oldComponent.matrixWorld.decompose(originalPosition, new THREE.Quaternion(), originalScale);

//   // Zachowaj indeks dziecka w rodzicu (aby wstawić nowy komponent w to samo miejsce)
//   const childIndex = actualParent.children.indexOf(oldComponent);

//   // Załaduj nowy model komponentu
//   const loader = new GLTFLoader();
//   loader.load(newComponentGLBPath, (gltf) => {
//     // Utwórz kontener dla nowego komponentu
//     const container = new THREE.Group();
//     const newComponent = gltf.scene;

//     console.log("Załadowano nowy komponent:", newComponent);

//     // Usuń stary komponent z jego FAKTYCZNEGO rodzica
//     actualParent.remove(oldComponent);
//     oldComponent.traverse((child) => {
//       if (child.geometry) child.geometry.dispose();
//       if (child.material) {
//         if (Array.isArray(child.material)) {
//           child.material.forEach((mat) => mat.dispose());
//         } else {
//           child.material.dispose();
//         }
//       }
//     });

//     // Wyzeruj transformacje nowego komponentu
//     newComponent.position.set(0, 0, 0);
//     newComponent.rotation.set(0, 0, 0);
//     newComponent.scale.set(1, 1, 1);

//     // Dodaj nowy komponent do kontenera
//     container.add(newComponent);

//     // Ustaw macierz kontenera na tę samą co stary komponent
//     container.applyMatrix4(originalMatrix);

//     // Dodaj kontener do rodzica w tym samym indeksie
//     if (childIndex !== -1) {
//       actualParent.children.splice(childIndex, 0, container);
//       container.parent = actualParent;
//     } else {
//       actualParent.add(container);
//     }

//     console.log("Podmieniono komponent, użyto kontenera z oryginalną macierzą");

//     // Aktualizuj referencję
//     if (oldComponent === motherboard) motherboard = newComponent;
//     else if (oldComponent === cpu) cpu = newComponent;
//     else if (oldComponent === ram) ram = newComponent;
//   });
// }

function replaceComponent4(loader, parent, oldComponent, newGLB) {
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
