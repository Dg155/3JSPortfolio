import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { FBXLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';


// Image access from html elements

var space = document.getElementById("space").src;
var headshot = document.getElementById("headshot").src;
var moonpic = document.getElementById("moon").src;
var moonnormal = document.getElementById("moonnormal").src;

var carPic = document.getElementById("CarTexture").src;
var carPicNormal = document.getElementById("CarTextureNormal").src;
var carPicMetallic = document.getElementById("CarTextureMetallic").src;
var carPicRoughness = document.getElementById("CarTextureRoughness").src;
var carPicHeight = document.getElementById("CarTextureHeight").src;

var logoPic = document.getElementById("LogoTexture").src;

// Variables

var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(30);
camera.position.setX(-3);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Custom Import

var zotZoomer = new THREE.Mesh();

const fbxLoader = new FBXLoader();
fbxLoader.load(
    './assets/Car.fbx',
    (object) => {
        object.position.set(-9.2, -1, 7.3)
        object.rotation.set(0.8, 0, 0)
        object.scale.set(1.1, 1.1, 1.1)

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff, // Base color
            roughness: 1,    // Roughness (1 for completely rough)
            metalness: 0,    // Metalness (0 for non-metallic)
        });
    
        // Load and assign texture maps
        const textureLoader = new THREE.TextureLoader();
        material.map = textureLoader.load(carPic);
        material.map.encoding = THREE.sRGBEncoding;
        material.normalMap = textureLoader.load(carPicNormal);
        material.normalMap.encoding = THREE.sRGBEncoding;
        material.roughnessMap = textureLoader.load(carPicRoughness);
        material.roughnessMap.encoding = THREE.sRGBEncoding;
        material.metalnessMap = textureLoader.load(carPicMetallic);
        material.metalnessMap.encoding = THREE.sRGBEncoding;
        material.displacementMap = textureLoader.load(carPicHeight);
        material.displacementMap.encoding = THREE.sRGBEncoding;
        material.displacementScale = 0; // Adjust the height map scale as needed

        object.traverse(function(child) {
            if (child.isMesh) {
                child.material = material; 
            }
        });

        zotZoomer = object;

        scene.add(zotZoomer)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

var zotZoomer2 = new THREE.Mesh();

fbxLoader.load(
    './assets/Car.fbx',
    (object) => {
        object.position.set(-12.5, -1, 24)
        object.rotation.set(0.8, 0, 0)
        object.scale.set(1.1, 1.1, 1.1)

        const carTexture = new THREE.TextureLoader().load(carPic);
        carTexture.encoding = THREE.sRGBEncoding;
        const carTextureNormal = new THREE.TextureLoader().load(carPicNormal);
        carTextureNormal.encoding = THREE.sRGBEncoding;
        object.traverse(function(child) {
            if (child.isMesh) {
                child.material.map = carTexture;
                child.material.normalMap = carTextureNormal;
            }
        });

        zotZoomer2 = object;

        scene.add(zotZoomer2)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

var zotZoomer3 = new THREE.Mesh();

fbxLoader.load(
    './assets/Car.fbx',
    (object) => {
        object.position.set(-15.8, -1, 40.7)
        object.rotation.set(0.8, 0, 0)
        object.scale.set(1.1, 1.1, 1.1)

        const carTexture = new THREE.TextureLoader().load(carPic);
        carTexture.encoding = THREE.sRGBEncoding;
        const carTextureNormal = new THREE.TextureLoader().load(carPicNormal);
        carTextureNormal.encoding = THREE.sRGBEncoding;
        object.traverse(function(child) {
            if (child.isMesh) {
                child.material.map = carTexture;
                child.material.normalMap = carTextureNormal;
            }
        });

        zotZoomer3 = object;

        scene.add(zotZoomer3)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

var zotZoomer4 = new THREE.Mesh();

fbxLoader.load(
    './assets/Car.fbx',
    (object) => {
        object.position.set(-19.1, -1, 57.4)
        object.rotation.set(0.8, 0, 0)
        object.scale.set(1.1, 1.1, 1.1)

        const carTexture = new THREE.TextureLoader().load(carPic);
        carTexture.encoding = THREE.sRGBEncoding;
        const carTextureNormal = new THREE.TextureLoader().load(carPicNormal);
        carTextureNormal.encoding = THREE.sRGBEncoding;
        object.traverse(function(child) {
            if (child.isMesh) {
                child.material.map = carTexture;
                child.material.normalMap = carTextureNormal;
            }
        });

        zotZoomer4 = object;

        scene.add(zotZoomer4)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

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
spaceTexture.encoding = THREE.sRGBEncoding;
scene.background = spaceTexture;

// Logo

var Logo = new THREE.Mesh();

fbxLoader.load(
    './assets/Logo.fbx',
    (object) => {
        object.position.set(6.7, 0, -13.5)
        object.rotation.set(0, 1.2, 0.15)
        object.scale.set(0.05, 0.05, 0.05)

        object.traverse(function(child) {
            if (child.isMesh) {

                const material = new THREE.MeshStandardMaterial({
                    color: 0xffffff, // Base color
                    roughness: 0,    // Roughness (1 for completely rough)
                    metalness: 0,    // Metalness (0 for non-metallic)
                    side: THREE.DoubleSide
                });
            
                // Load and assign texture maps
                const textureLoader = new THREE.TextureLoader();
                material.map = textureLoader.load(logoPic);
                material.map.encoding = THREE.sRGBEncoding;
                
                child.material = material;
            }
        });

        Logo = object;

        scene.add(Logo)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// Avatar

const danielTexture = new THREE.TextureLoader().load(headshot);
danielTexture.encoding = THREE.sRGBEncoding;
const danielMaterial = new THREE.MeshBasicMaterial({ map: danielTexture });


const daniel = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), danielMaterial);

scene.add(daniel);

daniel.position.set(-2, 0.15, 65.8)

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

//scene.add(moon);

// Lights

// Logo Light
const LogoLight = new THREE.PointLight(0xffffff);
LogoLight.position.set(3, 2, -2);
LogoLight.rotation.set(1, 10, 4);
LogoLight.intensity = 8;
LogoLight.distance = 100;
LogoLight.decay = 15;
scene.add(LogoLight);

// Enkore Light
const EnkoreLight = new THREE.PointLight(0xffffff);
EnkoreLight.position.set(-9.2, 8, 7.3);
EnkoreLight.rotation.set(0, 2.2, 0);
EnkoreLight.intensity = 8;
EnkoreLight.distance = 100;
EnkoreLight.decay = 20;
scene.add(EnkoreLight);

// const lightHelper = new THREE.PointLightHelper(LogoLight);
// scene.add(lightHelper);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.02;
  camera.position.x = t * 0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;
  Logo.rotation.y += 0.008;
  daniel.rotation.y += 0.002;
  zotZoomer.rotation.y += 0.008;
  zotZoomer2.rotation.y += 0.008;
  zotZoomer3.rotation.y += 0.008;
  zotZoomer4.rotation.y += 0.008;

  reSizeWindow();

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}

animate();


function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

function reSizeWindow()
{
    console.log(currentWidth);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentWidth = window.innerWidth;
    currentHeight = window.innerHeight;
    if (currentWidth < 251)
    {
        Logo.scale.set(0.015, 0.015, 0.015);
        Logo.position.set(-0.3, 4.5, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 8, -9);
    }
    else if (currentWidth < 351)
    {
        Logo.scale.set(0.02, 0.02, 0.02);
        Logo.position.set(-0.3, 4.5, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 8, -9);
    }
    else if (currentWidth < 501)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 6, -9);
    }
    else if (currentWidth < 769)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        LogoLight.position.set(0, 6, -9);
    }
    else if (currentWidth < 875)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(4.7, 0, -13.5);
    }
    else if (currentWidth < 1025)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(5.7, 0, -13.5);
    }
    else
    {
        Logo.scale.set(0.05, 0.05, 0.05);
        Logo.position.set(6.7, 0, -13.5);
    }
}