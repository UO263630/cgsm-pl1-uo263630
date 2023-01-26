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


    //PRAC1-4


    const geometry = new THREE.BoxGeometry( 30, 30, 30 );
    const material = new THREE.MeshBasicMaterial( {color: 0xff4333} );
    const box = new THREE.Mesh( geometry, material );
    box.position.x=-80

    const geometry2 = new THREE.SphereGeometry( 30, 30, 30 );
    const material2 = new THREE.MeshPhongMaterial({ color: 0x33ff3b } );
    const box2 = new THREE.Mesh( geometry2, material2 );
    box2.position.x=80

    const geometry3 = new THREE.CylinderGeometry( 15, 15, 30 );
    const material3 = new THREE.MeshLambertMaterial({ color: 0x3374ff} );
    const box3 = new THREE.Mesh( geometry3, material3 );

    box.rotation.set(0, Math.PI / 2, 0 );
    box3.rotation.set( Math.PI / 6,Math.PI / -6, 0 );

    //PRAC1-5

    const geometry4 = new THREE.BufferGeometry();

    const vertices = new Float32Array( [
        // Internal vertices
        -0.0, 0.0,  0,
        3.0, 3.0,  0,
        6.0, -6.0,  0,
        -9.0,  -9.0,  0,
        
        // External vertices
        -9.0,  9.0,  0,
        9.0,  9.0,  0,
        9.0, -9.0,  0,
       -9.0, -9.0,  0
    ] );
    
    // Faces (indices of vertices)
    const indices = [
        5, 4, 0,
        0, 1, 5,
        6, 5, 1,
        1, 2, 6,
        7, 6, 2,
        2, 3, 7,
        4, 7, 3,
        3, 0, 4
    ];
    
    geometry4.setIndex( indices );
    geometry4.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    


    const material4 = new THREE.MeshBasicMaterial( );
    const box4 = new THREE.Mesh( geometry4, material4 );
    box4.position.y=80

    const light = new THREE.DirectionalLight( 0xffffff, 0.5  ); // soft white light
    const light2 = new THREE.PointLight( 0xff0000, 1, 100 );
    const light3 = new THREE.AmbientLight( 0x404040 );
    light2.position.set( 50, 50, 50 );
  

    scene.add( box,box2,box3,box4,light, light2, light3 );
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