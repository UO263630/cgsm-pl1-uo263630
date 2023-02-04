import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import * as THREE from 'three';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 300 );

    const geometry = new THREE.SphereGeometry( 50, 50, 50 );
    const mapUrl = "../textures/tierra.png";   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl );
    const material = new THREE.MeshPhongMaterial( { map: map } );
    const tierra = new THREE.Mesh( geometry, material );

    const light = new THREE.PointLight( 0xffffff, 5, 500 );
    light.position.set( 50,0,100 );

    const geometry2 = new THREE.SphereGeometry( 51, 51, 51 );
    const mapUrl2 = "../textures/atmosfera.png";   // The file used as texture
    const textureLoader2 = new THREE.TextureLoader( );  // The object used to load textures
    const atmosphereMap = textureLoader2.load( mapUrl2 );
    var atmosphereMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmosphereMap, transparent: true } );
    const atmos = new THREE.Mesh( geometry2, atmosphereMaterial );



    tierra.rotation.set( Math.PI / 5, Math.PI / 5, 0 );

    scene.add( tierra , light, atmos);

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        ( loaded ) => { renderer.render( scene, camera ); }
    }, false );
}
