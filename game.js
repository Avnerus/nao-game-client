import THREE from 'three'
import Beam from './beam'

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
        this.camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.z = 500;
        this.scene.add(this.camera);
        this.clock = new THREE.Clock();


        // A Beam
        this.beam = new Beam(this.scene, this.renderer);
        this.beam.init()


        this.resize();
    }
    
    animate(t) {
      this.update(this.clock.getDelta());
      this.render(this.clock.getDelta());
    }

    update(dt) {
        this.beam.update()
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
