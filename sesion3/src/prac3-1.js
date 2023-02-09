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

    const geometry = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const material = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brick.jpg" , ( loaded ) => { renderer.render( scene, camera ); }),
        bumpMap: textureLoader.load( "../textures/brick-map.jpg" , ( loaded ) => { renderer.render( scene, camera ); })
    } );
    material.bumpScale =-4;
    const box = new THREE.Mesh( geometry, material );
    const light = new THREE.AmbientLight( 0xFFFFFF );
    const light2 = new THREE.PointLight( 0xffffff, 2, 400 );
    light2.position.set( -100,0,100 );
    
    box.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    box.position.set(-100,0,0);

    const geometry2 = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader2 = new THREE.TextureLoader( );  // The object used to load textures
    const material2 = new THREE.MeshPhongMaterial(
    {
        map: textureLoader2.load( "../textures/brick.jpg" , ( loaded ) => { renderer.render( scene, camera ); })
    } );
    const box2 = new THREE.Mesh( geometry2, material2 );
    
    box2.rotation.set( Math.PI / 5, Math.PI / 5, 0 );
    box2.position.set(100,0,0);

    scene.add( box , light, box2, light2);
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
    
    animate();

}


