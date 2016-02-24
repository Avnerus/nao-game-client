float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

uniform sampler2D positions;
varying vec2 vUv;
void main() {
    vec3 pos = texture2D( positions, vUv ).rgb;
    gl_FragColor = vec4( pos,1.0 );
}
