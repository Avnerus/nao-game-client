class Util {
    constructor() {

    }

    //returns an array of random 3D coordinates
    getRandomData( width, height, size ) {
        var len = width * height * 3;
        var data = new Float32Array( len );
        while( len-- )data[len] = ( Math.random() -.5 ) * size ;
        return data;
    }
}
// Singleton
let instance = new Util();
export default instance;
