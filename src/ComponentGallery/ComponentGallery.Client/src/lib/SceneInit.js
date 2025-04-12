import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 0.0001;
    this.farPlane = 200;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.set(0, 0.1, 0);

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });
    this.setSize();
    // this.renderer.shadowMap.enabled = true;
    const canvaDiv = document.getElementById('canvasDiv');
    canvaDiv.appendChild(this.renderer.domElement);

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Increase the intensity of the ambient light
    this.ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increased intensity
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // Increase the intensity of the directional light
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
    this.directionalLight.position.set(50, 32, 64);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.directionalLight2 = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
    this.directionalLight2.position.set(-50, 32, 64);
    this.directionalLight2.castShadow = true;
    this.scene.add(this.directionalLight2);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  setSize() {
    const canvas = document.getElementById(this.canvasId);
    const parent = canvas.parentElement;
    this.renderer.setSize(parent.clientWidth, parent.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
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
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const canvas = document.getElementById(this.canvasId);
    const parent = canvas.parentElement;

    this.camera.aspect = parent.clientWidth / parent.clientHeight;
    this.camera.updateProjectionMatrix();
    this.setSize();
  }
}