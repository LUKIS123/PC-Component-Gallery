import SceneInit from "@/lib/SceneInit";
import { useEffect } from "react";
import { useParams } from "react-router";
import * as THREE from "three";
import { EXRLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { Object3D, Object3DEventMap } from "three/src/Three.WebGPU.Nodes.js";

// Zmienne globalne do przechowywania referencji do obiektów
let gltfLoaderRef: GLTFLoader | null = null;
let caseModelRef: Object3D<Object3DEventMap> | undefined | null = null;
let motherboardRef: Object3D<Object3DEventMap> | undefined | null = null;
let cpuRef: Object3D<Object3DEventMap> | undefined | null = null;
let ramRef: Object3D<Object3DEventMap> | undefined | null = null;
let gpuRef: Object3D<Object3DEventMap> | undefined | null = null;

const caseComponentName = "CASE";
const ramComponentName = "RAM";
const cpuComponentName = "CPU";
const motherboardComponentName = "MB";
const gpuComponentName = "GPU";

// Eksportowane funkcje do podmiany komponentów
export function replaceRAM(componentId: number | string) {
  if (!ramRef || !gltfLoaderRef || !caseModelRef) {
    console.error("Cannot replace RAM - missing references");
    return false;
  }
  replaceComponent(
    gltfLoaderRef,
    caseModelRef,
    ramRef,
    `/api/assents/components/${componentId}/main`
  );
  return true;
}

export function replaceCPU(componentId: number | string) {
  if (!cpuRef || !gltfLoaderRef || !caseModelRef) {
    console.error("Cannot replace CPU - missing references");
    return false;
  }
  replaceComponent(
    gltfLoaderRef,
    caseModelRef,
    cpuRef,
    `/api/assents/components/${componentId}/main`
  );
  return true;
}

export function replaceMB(componentId: number | string) {
  if (!motherboardRef || !gltfLoaderRef || !caseModelRef) {
    console.error("Cannot replace motherboard - missing references");
    return false;
  }
  replaceComponent(
    gltfLoaderRef,
    caseModelRef,
    motherboardRef,
    `/api/assents/components/${componentId}/main`
  );
  return true;
}

export function replaceGPU(componentId: number | string) {
  if (!gpuRef || !gltfLoaderRef || !caseModelRef) {
    console.error("Cannot replace GPU - missing references");
    return false;
  }
  replaceComponent(
    gltfLoaderRef,
    caseModelRef,
    gpuRef,
    `/api/assents/components/${componentId}/main`
  );
  return true;
}

function Scene() {
  const { pcBuildId } = useParams();

  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.animate();

    const exrLoader = new EXRLoader();
    exrLoader.load(`/api/assents/backgrounds/1`, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      test.scene.environment = texture;
    });
    // Przypisz loader do zmiennej globalnej
    gltfLoaderRef = new GLTFLoader();
    // Ustawienia loadera
    gltfLoaderRef.load(
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

        // Przypisz komponenty do zmiennych globalnych
        caseModelRef = mainScene.getObjectByName(caseComponentName);
        motherboardRef = mainScene.getObjectByName(motherboardComponentName);
        cpuRef = mainScene.getObjectByName(cpuComponentName);
        ramRef = mainScene.getObjectByName(ramComponentName);
        gpuRef = mainScene.getObjectByName(gpuComponentName);

        if (!caseModelRef || !ramRef || !cpuRef || !motherboardRef || !gpuRef) {
          console.warn(
            "Nie znaleziono wszystkich wymaganych komponentów w modelu."
          );
        }

        // Reszta kodu bez zmian...
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);

        mainScene.position.sub(center); // Przesunięcie sceny do środka

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = test.camera.fov * (Math.PI / 180);
        const cameraDistance = maxDim / (2 * Math.tan(fov / 2));
        test.camera.position.set(
          center.x,
          center.y + maxDim,
          center.z + cameraDistance
        );

        test.setCameraZoomBounries(cameraDistance * 2, maxDim);


        test.camera.lookAt(center);
        test.camera.updateProjectionMatrix();
        test.scene.add(mainScene);
      },
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

// Oryginalna funkcja replaceComponent pozostaje bez zmian
function replaceComponent(
  loader: GLTFLoader,
  parent: Object3D<Object3DEventMap>,
  oldComponent: Object3D<Object3DEventMap>,
  newComponentGLBPath: string
) {
  // Załaduj nowy model komponentu
  loader.load(
    newComponentGLBPath,
    (gltf) => {
      const newComponent = gltf.scene;
      newComponent.name = oldComponent.name; // Zachowaj nazwę starego komponentu

      // Zachowaj transformacje starego komponentu
      newComponent.position.copy(oldComponent.position);
      newComponent.rotation.copy(oldComponent.rotation);
      newComponent.scale.copy(oldComponent.scale);

      // Usuń stary komponent
      parent.remove(oldComponent);
      oldComponent.traverse((child) => {
        // Check if child is a Mesh before accessing geometry or material
        if (child instanceof THREE.Mesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });

      // Dodaj nowy komponent do rodzica
      parent.add(newComponent);

      // Aktualizuj referencję globalną
      if (oldComponent === motherboardRef) motherboardRef = newComponent;
      else if (oldComponent === cpuRef) cpuRef = newComponent;
      else if (oldComponent === ramRef) ramRef = newComponent;
      else if (oldComponent === gpuRef) gpuRef = newComponent;

      console.log("Replaced component:", newComponent);
    },
    undefined,
    (error) => {
      console.error("Error occured while replacing component:", error);
    }
  );
}
