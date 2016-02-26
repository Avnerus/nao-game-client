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
    getRandomSpherePoint(v,size)
    {
        v.x = Math.random() * 2 - 1 ;
        v.y = Math.random() * 2 - 1 ;
        v.z = Math.random() * 2 - 1 ;
        if(v.length()>1)return this.getRandomSpherePoint(v,size);
        return v.normalize().multiplyScalar(size);
    }
    getSphere( count, size ){
        var len = count * 3;
        var data = new Float32Array( len );
        var p = new THREE.Vector3();
        for( var i = 0; i < len; i+=3 )
        {
            this.getRandomSpherePoint( p, size );
            data[ i     ] = p.x;
            data[ i + 1 ] = p.y;
            data[ i + 2 ] = p.z;
        }
        return data;
    }
}
// Singleton
let instance = new Util();
export default instance;
