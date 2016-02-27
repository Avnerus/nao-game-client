#pragma glslify: random = require(glsl-random)
#pragma glslify: curlNoise = require(glsl-curl-noise)

uniform sampler2D positions;
uniform float timer;
uniform float maxDepth;
varying vec2 vUv;

void main() {
    vec3 pos = texture2D( positions, vUv ).rgb;
    vec3 velocity = curlNoise(pos * 0.02) * 0.5;
    pos = pos + velocity;
    pos.z -= (random(vUv) * 10.0);
    if (pos.z < -2000.0) {
        pos.z = random(vUv);
    }
    
    gl_FragColor = vec4( pos,1.0 );
}
