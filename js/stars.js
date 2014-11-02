var camera, scene, renderer,
mouseX = 0, mouseY = 0,
particles = [],
star = new Image();
star.src = './assets/star.jpg';

init();

function init() {
camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000 );
camera.position.z = 1000;
scene = new THREE.Scene();
scene.add(camera);
renderer = new THREE.CanvasRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
document.addEventListener('mousemove', translateWorld, false);
makeParticles();
setInterval(update,1000/60);
}

function update() {
updateParticles();
renderer.render( scene, camera );
}

function makeParticles() {
var particle, material;
for ( var zpos= -1500; zpos < 1500; zpos+=20 ) {
    material = new THREE.ParticleCanvasMaterial( { color: 0xAAAAAA, program: particleRender } );
    particle = new THREE.Particle(material);
    particle.position.x = Math.random() * 4000 - 2000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = zpos;
    particle.scale.x = particle.scale.y = 10;
    scene.add( particle );
    particles.push(particle);
}
}

function particleRender( context ) {
context.beginPath();
//context.rect( 0, 0, 10, 10 );
//context.arc( 0, 0, 1, 0, Math.PI * 2, true );
context.drawImage(star, 0, 0, 5, 5);    
context.fill();
};

function updateParticles() {
for(var i=0; i<particles.length; i++) {
    particle = particles[i];
    particle.position.z += 10;
    if(mouseX>5 && mouseX<window.innerWidth-5)
	particle.position.x += (window.innerWidth/2 - mouseX)*0.01;
    if(particle.position.z>1000) particle.position.z-=3000;
}
}

function translateWorld(event){
mouseX = event.clientX;
mouseY = event.clientY;
}
