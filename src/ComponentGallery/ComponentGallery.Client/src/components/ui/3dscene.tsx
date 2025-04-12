import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from '../../lib/SceneInit';
import { EXRLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';



function Scene() {
    useEffect(() => {
        const test = new SceneInit('myThreeJsCanvas');
        test.initialize();
        test.animate();

        const exrLoader = new EXRLoader();

        exrLoader.load('./assets/photo_studio_01_4k.exr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            test.scene.environment = texture;
            // test.scene.background = texture;
        });

        const gltfLoader = new GLTFLoader();

        gltfLoader.load(
            './assets/am4cpu/am4cpu.gltf',
            (gltfScene) => {
                console.log('Model loaded:', gltfScene);
                gltfScene.scene.traverse(node => {
                    if (node.isMesh) {
                        console.log(node.material);
                        node.material.transparent = true;
                        node.material.alphaTest = 0.6;
                        node.material.needsUpdate = true;
                    }
                })
                test.scene.add(gltfScene.scene);
            },
            undefined,
            (error) => {
                console.error('An error happened while loading the GLTF model:', error);
            }
        );

    }, []);

    return (
        <div>
            <div>Three.js App</div>
            <div id="canvasDiv" style={{ height: '300px', width: '300px' }}>
                <canvas id="myThreeJsCanvas"></canvas>
            </div>
        </div>
    );
}
export default Scene;