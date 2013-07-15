document.addEventListener('click', function(){
load();}, false);

function load(){
    
    var camera, scene, renderer, X, y ,Z;
    var geometry, material, mesh, pointLight;
    var div = document.getElementById('canv');
    div.innerHTML = "";
    init();
    animate();
    
    
    function init() {
        var width = 400, height = 200;
        camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        X = camera.position.x;
        Y = camera.position.y;
        Z = camera.position.z;
       
        scene = new THREE.Scene();
        geometry = new THREE.SphereGeometry( 100, 25, 25 );
        for ( var i = 0; i < geometry.faces.length; i ++ ) {
          var face = geometry.faces[ i ];
          face.color.setHex( Math.random() * 0x00ff00 );
        }
        material = new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.7, skinning: false, vertexColors: THREE.FaceColors } );
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        div.appendChild( renderer.domElement );
    }
    var down = 1;
    var time = 0;
    var u = 0, v = 0;
    var CR = 0.9;//co-efficient of restitution
    var maxH = window.innerHeight/2;
    var rotX = Math.random() * 0.02, rotY = Math.random() * 0.02;
    function animate() {
        requestAnimationFrame( animate );
        if(maxH/window.innerHeight/2 > 0.002)
          bounce();
        renderer.render( scene, camera );
    }
    function bounce() {
      mesh.position.set(camera.position.x, Y, camera.position.z-1000);        
      if(Y>-window.innerHeight/2 && down==1){ // falling down
        Y -= (u*time + 0.5*9.8*time*time);
        time += 6/60;
      }	 
      else if (Y <= -window.innerHeight/2 && down ==1){
        v = u + 9.8*time;
        u = CR*v;
        maxH *= CR*CR;	
        time = 0;
        down = 0;
      }
      else if((Y)<(maxH-window.innerHeight/2) && down==0 && parseInt(v)>=0){ // bouncing
        v = u - 9.8*time;
        Y += (v*v)/(2*9.8);
        time += 6/60;
      }
      else{
        u = 0;
        time = 0;	
     	down = 1;
      } 
      mesh.rotation.x -= rotX;
      mesh.rotation.y += rotY; 
    }
}
