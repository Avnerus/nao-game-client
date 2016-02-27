import Util from './util'
import FBO from './lib/fbo'

export default class Beam {
    constructor(scene, renderer) {
        const glslify = require('glslify');

        // Shaders
        this.render_fs = glslify('./glsl/render_fs.glsl')
        this.render_vs = glslify('./glsl/render_vs.glsl')
        this.simulation_fs = glslify('./glsl/simulation_fs.glsl')
        this.simulation_vs = glslify('./glsl/simulation_vs.glsl')

        this.width = 128
        this.height = 128

        this.scene = scene
        this.renderer = renderer

        this.maxDepth = 50.0;

        console.log("Beam Constructed!")
    }

    init() {
        let geometry = new THREE.CubeGeometry(10, 5, 10);
        let data = new Float32Array( this.width * this.height * 3  );
        //let data = Util.getSphere(this.width * this.height, 128);
        let points = THREE.GeometryUtils.randomPointsInGeometry( geometry, this.width * this.height);
        for ( var i = 0, j = 0, l = data.length; i < l; i += 3, j += 1 ) {
            data[ i ] = points[ j ].x;
            data[ i + 1 ] = points[ j ].y;
            data[ i + 2 ] = points[ j ].z;
        }
        let positions = new THREE.DataTexture( data, this.width, this.height, THREE.RGBFormat, THREE.FloatType );
        positions.needsUpdate = true;
        this.rttIn = positions;

        this.simulationShader = new THREE.ShaderMaterial({
            uniforms: {
                positions: { type: "t", value: positions },
                timer: { type: "f", value: 0 },
                maxDepth : { type: "f", value: this.maxDepth }
            },
            vertexShader: this.simulation_vs,
            fragmentShader:  this.simulation_fs
        });

        this.renderShader = new THREE.ShaderMaterial( {
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
        this.fbo.init( this.width,this.height, this.renderer, this.simulationShader, this.renderShader );
        this.fbo.particles.position.y = -10;
        this.fbo.particles.position.x = 30;
        this.fbo.particles.position.z = 270;
        this.scene.add( this.fbo.particles );
    }


    update(dt) {
        //update the simulation
        this.fbo.update();

        //update mesh 
        //this.fbo.particles.rotation.x += Math.PI / 180 * .5;
        //this.fbo.particles.rotation.y -= Math.PI / 180 * .5;
     }

    getRandomBeamParticles() {
        
    }
}
