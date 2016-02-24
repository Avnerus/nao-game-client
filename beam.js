import Util from './util'
import THREE from 'three'
import FBO from './lib/fbo'

export default class Beam {
    constructor(scene, renderer) {
        const glslify = require('glslify');

        // Shaders
        this.render_fs = glslify('./glsl/render_fs.glsl')
        this.render_vs = glslify('./glsl/render_vs.glsl')
        this.simulation_fs = glslify('./glsl/simulation_fs.glsl')
        this.simulation_vs = glslify('./glsl/simulation_vs.glsl')

        this.width = 256
        this.height = 256

        this.scene = scene
        this.renderer = renderer

        console.log("Beam Constructed!")
    }

    init() {
        let data = Util.getRandomData( this.width, this.height, 256 );
        let positions = new THREE.DataTexture( data, this.width, this.height, THREE.RGBFormat, THREE.FloatType );
        positions.needsUpdate = true;

        let simulationShader = new THREE.ShaderMaterial({
            uniforms: {
                positions: { type: "t", value: positions }
            },
            vertexShader: this.simulation_vs,
            fragmentShader:  this.simulation_fs
        });

        var renderShader = new THREE.ShaderMaterial( {
            uniforms: {
                positions: { type: "t", value: null },
                pointSize: { type: "f", value: 2 }
            },
            vertexShader: this.render_vs,
            fragmentShader: this.render_fs,
            transparent: true,
            blending:THREE.AdditiveBlending
        } );

        this.fbo = new FBO()
        this.fbo.init( this.width,this.height, this.renderer, simulationShader, renderShader );
        this.scene.add( this.fbo.particles );
    }

    update() {
        //update the simulation
        this.fbo.update();
        //update mesh
        this.fbo.particles.rotation.x += Math.PI / 180 * .5;
        this.fbo.particles.rotation.y -= Math.PI / 180 * .5;
    }
}
