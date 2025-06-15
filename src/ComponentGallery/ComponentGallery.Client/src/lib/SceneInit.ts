import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class SceneInit {
  public readonly scene: THREE.Scene;

  public readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly ambientLight: THREE.AmbientLight;
  private readonly directionalLight: THREE.DirectionalLight;
  private readonly directionalLight2: THREE.DirectionalLight;
  private readonly hemisphereLight: THREE.HemisphereLight;
  private boundingBox: THREE.Box3 | null = null;
  private showcase = false; // Flag to determine if the scene is a showcase

  constructor(private canvasId: string) {
    const fov = 45;
    const nearPlane = 0.0001;
    const farPlane = 200;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth / window.innerHeight,
      nearPlane,
      farPlane
    );
    this.camera.position.set(0, 0.1, 0);

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    if (!canvas) {
      throw new Error(`Canvas with id ${this.canvasId} not found`);
    }

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.setSize();
    // this.renderer.shadowMap.enabled = true;
    const canvaDiv = document.getElementById("canvasDiv");
    canvaDiv?.appendChild(this.renderer.domElement);

    // this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Increase the intensity of the ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff); // Increased intensity
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1); // Increased intensity
    this.hemisphereLight.position.set(0, 0, 0);
    this.hemisphereLight.castShadow = true;
    this.scene.add(this.hemisphereLight);

    // Increase the intensity of the directional light
    this.directionalLight = new THREE.DirectionalLight(0xffffff); // Increased intensity
    this.directionalLight.position.set(50, 32, 64);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.directionalLight2 = new THREE.DirectionalLight(0xffffff); // Increased intensity
    this.directionalLight2.position.set(-50, 32, -64);
    this.directionalLight2.castShadow = true;
    this.scene.add(this.directionalLight2);


    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  setSize() {
    const canvas = document.getElementById(this.canvasId);
    const parent = canvas?.parentElement;

    if (!parent) return;

    this.renderer.setSize(parent.clientWidth, parent.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.updateProjectionMatrix();
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.setSize();
    this.checkFrustum();
    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.render(this.scene, this.camera);
  }

  checkFrustum() {
    const frustum = new THREE.Frustum();
    frustum.setFromProjectionMatrix(
      new THREE.Matrix4().multiplyMatrices(
        this.camera.projectionMatrix,
        this.camera.matrixWorldInverse
      )
    );

    if (this.boundingBox !== null && this.boundingBox.isEmpty() === false) {
      if (!frustum.intersectsBox(this.boundingBox)) {
        console.warn("Bounding box is not in the frustum of the camera.");
        this.resetCameraPosition();
      }
    }
  }

  updateProjectionMatrix() {
    const canvas = document.getElementById(this.canvasId);
    const parent = canvas?.parentElement;
    if (!parent) return;
    this.camera.aspect = parent.clientWidth / parent.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    this.setSize();
  }

  setCameraZoomBoundaries(maxDistance: number, minDistance: number) {
    this.controls.maxDistance = maxDistance; // Maximum distance from the camera to the object
    this.controls.minDistance = minDistance; // Minimum distance from the camera to the object
  }

  resetCameraPosition() {
    if (this.boundingBox !== null) {
      const center = new THREE.Vector3();
      this.boundingBox.getCenter(center);
      const size = new THREE.Vector3();
      this.boundingBox.getSize(size);


      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = this.camera.fov * (Math.PI / 180);
      const cameraDistance = maxDim / (2 * Math.tan(fov / 2));
      const cameraPosition = new THREE.Vector3();

      if (this.showcase) {
        cameraPosition.set(0,
          0,
          maxDim + cameraDistance
        );
      } else {
        cameraPosition.set(0,
          maxDim + cameraDistance,
          0
        );
      }

      this.camera.position.copy(cameraPosition);
      this.setCameraZoomBounries(cameraDistance * 2, maxDim);

      this.camera.lookAt(center);
      this.camera.updateProjectionMatrix();
      this.controls.target.copy(center);
      this.controls.update();
    }
  }

  setCameraSettings(box: THREE.Box3, showcase: boolean) {
    this.boundingBox = box;
    // const boxHelper = new THREE.Box3Helper(box, new THREE.Color(0xff0000));
    // this.scene.add(boxHelper);

    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = this.camera.fov * (Math.PI / 180);
    const cameraDistance = maxDim / (2 * Math.tan(fov / 2));

    const cameraPosition = new THREE.Vector3();

    if (showcase) {
      cameraPosition.set(0,
        0,
        maxDim + cameraDistance
      );
    } else {
      cameraPosition.set(0,
        maxDim + cameraDistance,
        0
      );
    }

    this.camera.position.copy(cameraPosition);

   this.setCameraZoomBoundaries(cameraDistance * 2, maxDim);

    this.showcase = showcase;
  }

}

