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

    const geometry = new THREE.SphereGeometry( 25,25,25);
    const mapUrl = "../textures/tierra.png";   // The file used as texture
    const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const map = textureLoader.load( mapUrl );
    const material = new THREE.MeshPhongMaterial( { map: map } );
    const tierra = new THREE.Mesh( geometry, material );

    const light = new THREE.PointLight( 0xffffff, 5, 500 );
    light.position.set( 50,0,100 );

    const geometry2 = new THREE.SphereGeometry( 26,26,26);
    const mapUrl2 = "../textures/atmosfera.png";   // The file used as texture
    const textureLoader2 = new THREE.TextureLoader( );  // The object used to load textures
    const atmosphereMap = textureLoader2.load( mapUrl2 );
    var atmosphereMaterial = new THREE.MeshLambertMaterial( { color: 0xFFFFFF, map: atmosphereMap, transparent: true } );
    const atmos = new THREE.Mesh( geometry2, atmosphereMaterial );




    tierra.rotation.set( 0, 0, 0.36 );
    atmos.rotation.set( 0, 0, 0.36 );

    const lunageometry = new THREE.SphereGeometry( 10,10,10 );
    const lunamapUrl = "../textures/luna.gif";   // The file used as texture
    const lunatextureLoader = new THREE.TextureLoader( );  // The object used to load textures
    const lunaMap = lunatextureLoader.load( lunamapUrl, ( loaded ) => { renderer.render( scene, camera ); } );
    const lunamaterial = new THREE.MeshLambertMaterial( { map: lunaMap, color: 0x888888 } );
    const luna = new THREE.Mesh( lunageometry, lunamaterial );

   //... TODO: create the Moon and compute the distance to the Earth

    // Move the Moon away from the coordinate origin (the Earth)
    // NOT TO SCALE. Real value: Math.sqrt( distance * distance / 2 )
    const distance =20000
    luna.position.set( Math.sqrt( distance / 2 ), 0, -Math.sqrt( distance / 2 ) );
    //luna.position.set(50,50,50)
    // Rotate the Moon to face visible side to the Earth (tidal locking)
    luna.rotation.y = Math.PI;

    // Moon should rotate around the Earth: an Object3D is needed
    const moonGroup = new THREE.Object3D();

    moonGroup.add( luna );

    // The Moon orbit is a bit tilted
    moonGroup.rotation.x = 0.089;

    scene.add( tierra , light, atmos, luna);
    
    

    window.addEventListener( 'resize', ( ) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix( );
        renderer.setSize( window.innerWidth, window.innerHeight );
        ( loaded ) => { renderer.render( scene, camera ); }
    }, false );

    

    const clock = new THREE.Clock( );

    function animate( ) {

        const delta = clock.getDelta( ); // Elapsed time in seconds

        // UPDATE THE SCENE ACCORDING TO THE ELAPSED TIME
        const rotation = ( delta * Math.PI * 2 ) / 24;
        tierra.rotation.y += rotation;
        atmos.rotation.y += rotation * 0.95;

        // Render the scene
        renderer.render( scene, camera );

        // Request the browser to execute the animation-rendering loop
        requestAnimationFrame( animate );
    };
    
    animate();
}



