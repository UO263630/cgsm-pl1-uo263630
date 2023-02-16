import WEBGL from 'three/examples/jsm/capabilities/WebGL.js';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

if ( WEBGL.isWebGLAvailable() ) {
    // WebGL is available
    const scene = new THREE.Scene();


    const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const camera = new THREE.PerspectiveCamera ( 45, window.innerWidth / window.innerHeight, 1, 4000 );
    camera.position.set( 0, 20, 400 );
    const listener = new THREE.AudioListener();
    camera.add( listener );

    const rayCaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let intersectedObject = null;

   
    const geometry = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures 
    const specialFaceMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/cubo.png" , ( loaded ) => { renderer.render( scene, camera ); }),
        bumpMap: textureLoader.load( "../textures/cubo-map.png" , ( loaded ) => { renderer.render( scene, camera ); })
    } );// Material for a face
    
    const regularFaceMaterial = new THREE.MeshPhongMaterial(
    {
        map: textureLoader.load( "../textures/brick.jpg" , ( loaded ) => { renderer.render( scene, camera ); }),
        bumpMap: textureLoader.load( "../textures/brick-map.jpg" , ( loaded ) => { renderer.render( scene, camera ); })
    } );// Material for the rest of the faces

    const materials = [
        specialFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial,
        regularFaceMaterial
    ];

    const audioLoader = new THREE.AudioLoader();
    const sound = new THREE.PositionalAudio( listener );
    audioLoader.load( "../sounds/audio1.ogg", ( buffer ) => {
        sound.setBuffer( buffer );
        sound.setRefDistance( 20 );
        sound.setLoop( true );
        sound.setRolloffFactor( 1 );
        sound.play(); // Modern browsers do not allow sound to start without user interaction
    });

    
    materials.bumpScale =4;
    const box = new THREE.Mesh( geometry, materials );

    //const light = new THREE.AmbientLight( 0xFFFFFF );
    const light2 = new THREE.PointLight( 0xffffff, 4, 150 );
    light2.position.set( -130,20,-50 );


    box.position.set(-200,25,-100);



    const geometry2 = new THREE.BoxGeometry( 50, 50, 50 );
    const textureLoader2 = new THREE.TextureLoader( );  // The object used to load textures
    const specialFaceMaterial2 = new THREE.MeshPhongMaterial(
    {
        map: textureLoader2.load( "../textures/cubo.png" , ( loaded ) => { renderer.render( scene, camera ); })
    } );// Material for a face
        
    const regularFaceMaterial2 = new THREE.MeshPhongMaterial(
    {
        map: textureLoader2.load( "../textures/brick.jpg" , ( loaded ) => { renderer.render( scene, camera ); })
    } );// Material for the rest of the faces

    const materials2 = [
        regularFaceMaterial2,
        specialFaceMaterial2,
        regularFaceMaterial2,
        regularFaceMaterial2,
        regularFaceMaterial2,
        regularFaceMaterial2
    ];

    const audioLoader2 = new THREE.AudioLoader();
    const sound2 = new THREE.PositionalAudio( listener );
    audioLoader2.load( "../sounds/audio2.ogg", ( buffer ) => {
        sound2.setBuffer( buffer );
        sound2.setRefDistance( 20 );
        sound2.setLoop( true );
        sound2.setRolloffFactor( 1 );
        sound2.play(); // Modern browsers do not allow sound to start without user interaction
    });


    const box2 = new THREE.Mesh( geometry2, materials2 );
    
    box2.position.set(200,25,-100);

    const helper = new THREE.GridHelper( 800, 40, 0x444444, 0x444444 );
    helper.position.y = 0.1;
    const light3 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light3.position.set( 0,0.5,100 );

    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xf0f0f0, 0.6 );
    hemiLight.position.set( 0, 500, 0 );
 

    const controls = new FirstPersonControls( camera, renderer.domElement );
    controls.movementSpeed = 70;
    controls.lookSpeed = 0.05;
    controls.noFly = false;
    controls.lookVertical = false;



    scene.add( box , light2, box2 ,helper, light3, hemiLight, controls);
    box.add(sound);
    box2.add(sound2);
    box.name="box";
    box2.name="box2";
    helper.name="suelo";

    renderer.render( scene, camera);

 
    document.body.addEventListener( 'mousemove', ( event ) => {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }, false );
    

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.render( scene, camera );
    }, false );



    

    const clock = new THREE.Clock( );

    function animate( ) {

        const delta = clock.getDelta( ); // Elapsed time in seconds
        
        controls.update( delta );
        

        rayCaster.setFromCamera( mouse, camera );

        // Look for all the intersected objects
        const intersects = rayCaster.intersectObjects( scene.children );
        if ( intersects.length > 0 ) {

            // Sorted by Z (close to the camera)
            if ( intersectedObject != intersects[ 0 ].object ) {

                intersectedObject = intersects[ 0 ].object;
                console.log( 'New intersected object: ' + intersectedObject.name );
            }
        } else {

            intersectedObject = null;
        }
                


        
        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
        // Render the scene
        renderer.render( scene, camera );

        
    };
    
    animate();


}


