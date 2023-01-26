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

    const geometry = new THREE.BoxGeometry( 30, 30, 30 );
    const material = new THREE.MeshBasicMaterial( {color: 0xff4333} );
    const box = new THREE.Mesh( geometry, material );
    box.position.x=-80

    const geometry2 = new THREE.SphereGeometry( 30, 30, 30 );
    const material2 = new THREE.MeshBasicMaterial({ color: 0x33ff3b } );
    const box2 = new THREE.Mesh( geometry2, material2 );
    box2.position.x=80

    const geometry3 = new THREE.CylinderGeometry( 15, 15, 30 );
    const material3 = new THREE.MeshBasicMaterial({ color: 0x3374ff} );
    const box3 = new THREE.Mesh( geometry3, material3 );

    box.rotation.set(0, Math.PI / 2, 0 );
    box3.rotation.set( Math.PI / 6,Math.PI / -6, 0 );

    scene.add( box,box2,box3 );
    renderer.render( scene, camera );

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );
}

else{
    
}