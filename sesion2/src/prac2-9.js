import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import * as THREE from 'three';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 0, 80 );

    const modelUrl = "../models/iss.dae";
    let iss;
    
    const light = new THREE.PointLight( 0xffffff, 5, 500 );
    light.position.set( 50,0,100 );


    const loadingManager = new THREE.LoadingManager( ( ) => {
    
        scene.add( iss,light );
        renderer.render( scene, camera );
        console.log( 'Model loaded' );
    } );
    
    const loader = new ColladaLoader( loadingManager );
    loader.load( modelUrl, ( collada ) => {
    
        iss = collada.scene;
        iss.scale.x = iss.scale.y = iss.scale.z = 0.3;
        iss.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
        iss.updateMatrix( );
    } );

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        ( loaded ) => { renderer.render( scene, camera ); }
    }, false );

}