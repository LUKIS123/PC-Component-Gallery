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
    
    // this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.render(this.scene, this.camera);
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

  setCameraZoomBounries(maxDistance: number, minDistance: number) { 
    this.controls.maxDistance = maxDistance; // Maximum distance from the camera to the object
    this.controls.minDistance = minDistance; // Minimum distance from the camera to the object
  }
}
