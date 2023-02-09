import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import Stats from 'three/examples/jsm/libs/stats.module';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    const scene = new THREE.Scene();


    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 20, 300 );


    const specialFaceMaterial = Material// Material for a face
    const regularFaceMaterial = "../textures/brick.jpg"// Material for the rest of the faces
    const geometry = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brick.jpg" , ( loaded ) => { renderer.render( scene, camera ); }),
        bumpMap: textureLoader.load( "../textures/brick-map.jpg" , ( loaded ) => { renderer.render( scene, camera ); })
    } );
    const materials = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial
    ];
    const box = new THREE.Mesh( geometry, materials );

    const light = new THREE.AmbientLight( 0xFFFFFF );
    const light2 = new THREE.PointLight( 0xffffff, 2, 400 );
    light2.position.set( -100,0,100 );


    box.position.set(-100,10,0);



    const geometry2 = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader2 = new THREE.TextureLoader( );  // The object used to load textures
    const material2 = new THREE.MeshPhongMaterial(
    {
        map: textureLoader2.load( "../textures/brick.jpg" , ( loaded ) => { renderer.render( scene, camera ); })
    } );
    const box2 = new THREE.Mesh( geometry2, material2 );
    
    box2.position.set(100,10,0);

    const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
    helper.position.y = 0.1;
    const light3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light3.position.set( 0,0.5,100 );

    scene.add( box , light, box2,helper, light3);
    renderer.render( scene, camera);

 


    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );


    
    const clock = new THREE.Clock( );

    function animate( ) {

        const delta = clock.getDelta( ); // Elapsed time in seconds

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;
        
        box.rotation.y += rotation;
        box2.rotation.y += rotation;
        
        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
        // Render the scene
        renderer.render( scene, camera );

        
    };
    
    //animate();

}


