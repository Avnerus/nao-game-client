#pragma glslify: random = require(glsl-random)

uniform sampler2D positions;
uniform float timer;
uniform float maxDepth;
varying vec2 vUv;

void main() {
    vec3 pos = texture2D( positions, vUv ).rgb;
    pos.z -= random(vUv);
    if (pos.z < -20.0) {
        pos.z = random(vUv);
    }
    
    gl_FragColor = vec4( pos,1.0 );
}
