import './style.css';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// import space from './assets/images/space.jpg';
// import headshot from './assets/images/headshot.jpg ';
// import moonpic from './assets/images/moonpic.jpg';
// import moonnormal from './assets/images/moonnormal.jpg';

var space = document.getElementById("space").src;
var headshot = document.getElementById("headshot").src;
var moonpic = document.getElementById("moon").src;
var moonnormal = document.getElementById("moonnormal").src;

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputColorSpace = THREE.SRGBColorSpace;
//THREE.ColorManagement.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(30);
camera.position.setX(-3);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

// Stars

function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load(space);
console.log(spaceTexture);
spaceTexture.encoding = THREE.sRGBEncoding;
scene.background = spaceTexture;

// Avatar

const danielTexture = new THREE.TextureLoader().load(headshot);
danielTexture.encoding = THREE.sRGBEncoding;
const danielMaterial = new THREE.MeshBasicMaterial({ map: danielTexture });


const daniel = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), danielMaterial);

scene.add(daniel);

daniel.position.z = -5;
daniel.position.x = 2.5;

daniel.rotation.z = -0.02;

// Moon

const moonTexture = new THREE.TextureLoader().load(moonpic);
moonTexture.encoding = THREE.sRGBEncoding;
const normalTexture = new THREE.TextureLoader().load(moonnormal);
normalTexture.encoding = THREE.sRGBEncoding;

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// Rotate objects with mouse

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;
  daniel.rotation.y += 0.002;

  // controls.update();

  renderer.gammaOutput = true;
  renderer.render(scene, camera);
}

animate();