require('glslify')

import THREE from 'three'
import glShader from 'gl-shader'

export default class Game {
    constructor() {
        console.log("Game constructed!")
    }
    init() {
        this.renderer = new THREE.WebGLRenderer(); 
        this.renderer.setClearColor( 0x00000, 1 );
        let element = this.renderer.domElement;
        let container = document.getElementById('game');
        container.appendChild(element);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90,window.innerWidth / window.innerHeight, 1, 3000);
        this.scene.add(this.camera);


        this.clock = new THREE.Clock();
        this.resize();
    }
    
    animate(t) {
      this.update(this.clock.getDelta());
      this.render(this.clock.getDelta());
    }

    update(dt) {
    }

    render(dt) {
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
