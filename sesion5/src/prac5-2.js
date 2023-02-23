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


    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', () => init(), false);

    function init() {
        var overlay = document.getElementById('overlay');
        overlay.remove();
        

        const video = document.getElementById('player');
        const image = document.createElement( 'canvas' );
        image.width = 480;  // Video width
        image.height = 204; // Video height
        const imageContext = image.getContext( '2d' );
        imageContext.fillStyle = '#000000';
        imageContext.fillRect( 0, 0, image.width - 1, image.height - 1 );
        const texture = new THREE.Texture( image );
        
        const textureLoader = new THREE.TextureLoader( );  // The object used to load textures
        const material = new THREE.MeshBasicMaterial(
        {
            map: texture
        } );
        
        const wall = new THREE.Mesh( new THREE.PlaneGeometry( image.width, image.height, 4, 4 ), material );

        const url = "http://localhost:60080/counter.mpd";
        const player = dashjs.MediaPlayer().create();
        player.initialize(document.querySelector("#player"), url, true);

        scene.add( wall );
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
            const rotation = ( delta * Math.PI * 2 ) / 5;
            
            wall.rotation.y += rotation;

            if ( video.readyState === video.HAVE_ENOUGH_DATA ) {

                imageContext.drawImage( video, 0, 0 );
                if ( texture ) texture.needsUpdate = true;
            }
            // Request the browser to execute the animation-rendering loop
            requestAnimationFrame( animate );
            // Render the scene
            renderer.render( scene, camera );

            
        };
        
        animate();
        video.play();
    }
}


