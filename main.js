import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { FBXLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/FBXLoader.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/UnrealBloomPass.js';


// Image access from html elements

var space = document.getElementById("grid").src;
var headshot = document.getElementById("headshot").src;
var moonpic = document.getElementById("moon").src;
var moonnormal = document.getElementById("moonnormal").src;

var carPic = document.getElementById("CarTexture").src;
var carPicNormal = document.getElementById("CarTextureNormal").src;
var carPicMetallic = document.getElementById("CarTextureMetallic").src;
var carPicRoughness = document.getElementById("CarTextureRoughness").src;
var carPicHeight = document.getElementById("CarTextureHeight").src;

var CCPic = document.getElementById("CCTexture").src;
var CCNeutralPic = document.getElementById("CCNeutralTexture").src;

var MMPic = document.getElementById("MMTexture").src;

var logoPic = document.getElementById("LogoTexture").src;

// Variables

var currentWidth = window.innerWidth;
var currentHeight = window.innerHeight;
var logoStartRotation = -0.5;
var logoEndRotation = 2.64;

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

var objectsLoadedBools = {
    logo: false,
    enkore: false,
    celestial: false,
    zotZoomer: false,
    musicalMadness: false
};

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

// const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
// composer.addPass(bloomPass);


// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Custom Import

var EnKore = new THREE.Mesh();

const fbxLoader = new FBXLoader();
fbxLoader.load(
    './assets/EnKore.fbx',
    (object) => {
        object.position.set(-9, -2, 7.3) 
        object.rotation.set(0, 4, 0)
        object.scale.set(0.007, 0.007, 0.007)

        // object.traverse(function(child) {
        //     if (child.isMesh) {
        //         child.material.emissive = new THREE.Color(0x030303); 
        //     }
        // });

        EnKore = object;

        scene.add(EnKore)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        objectsLoadedBools.enkore = true;
        showScreenAfterLoad();
    },
    (error) => {
        console.log(error);
    }
)

var Celestial = new THREE.Mesh();

fbxLoader.load(
    './assets/CC.fbx',
    (object) => {
        object.position.set(-13, 0, 18)
        // object.rotation.set(0.8, 0, 0)
        object.scale.set(0.0035, 0.0035, 0.0035)

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff, // Base color
            roughness: 0.5,    // Roughness (1 for completely rough)
            metalness: 0.5,    // Metalness (0 for non-metallic)
        });

        const textureLoader = new THREE.TextureLoader();
        material.map = textureLoader.load(CCPic);
        material.map.encoding = THREE.sRGBEncoding;

        object.traverse(function(child) {
            if (child.isMesh) {
                child.material = material; 
            }
        });

        Celestial = object;

        scene.add(Celestial)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        objectsLoadedBools.celestial = true;
        showScreenAfterLoad();
    },
    (error) => {
        console.log(error);
    }
)

var zotZoomer = new THREE.Mesh();

fbxLoader.load(
    './assets/Car.fbx',
    (object) => {
        object.position.set(-13, -0.7, 32.8)
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
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        objectsLoadedBools.zotZoomer = true;
        showScreenAfterLoad();
    },
    (error) => {
        console.log(error);
    }
)

var MusicalMadness = new THREE.Mesh();

fbxLoader.load(
    './assets/MM.fbx',
    (object) => {
        object.position.set(-10, -0.3, 50)
        object.rotation.set(0, 0, 0)
        object.scale.set(0.03, 0.03, 0.03)

        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff, // Base color
            roughness: 0.5,    // Roughness (1 for completely rough)
            metalness: 0,    // Metalness (0 for non-metallic)
        });

        const textureLoader = new THREE.TextureLoader();
        material.map = textureLoader.load(MMPic);
        material.map.encoding = THREE.sRGBEncoding;

        object.traverse(function(child) {
            if (child.isMesh) {
                child.material = material; 
            }
        });

        MusicalMadness = object;

        scene.add(MusicalMadness)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        objectsLoadedBools.musicalMadness = true;
        showScreenAfterLoad();
    },
    (error) => {
        console.log(error);
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

// Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load(space);
spaceTexture.encoding = THREE.sRGBEncoding;
scene.background = spaceTexture;

// Logo

var Logo = new THREE.Mesh();

fbxLoader.load(
    './assets/Logo.fbx',
    (object) => {
        object.position.set(7.4, 0, -13.5)
        // object.rotation.set(0, 2.64, 0)
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
        objectsLoadedBools.logo = true;
        showScreenAfterLoad();
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
EnkoreLight.position.set(-9, 8, 7.3);
EnkoreLight.rotation.set(0, 2.2, 0);
EnkoreLight.intensity = 8;
EnkoreLight.distance = 100;
EnkoreLight.decay = 20;
scene.add(EnkoreLight);

// Celestial Light
const CelestialLight = new THREE.PointLight(0xffffff);
CelestialLight.position.set(-8, 0, 23);
CelestialLight.rotation.set(0, 2.2, 0);
CelestialLight.intensity = 3;
CelestialLight.distance = 100;
CelestialLight.decay = 20;
scene.add(CelestialLight);

// Zot Light
const ZotLight = new THREE.PointLight(0xffffff);
ZotLight.position.set(-13, 7.3, 32.8);
ZotLight.rotation.set(0, 2.2, 0);
ZotLight.intensity = 8;
ZotLight.distance = 100;
ZotLight.decay = 20;
scene.add(ZotLight);

// Musical Light
const MusicalLight = new THREE.PointLight(0xffffff);
MusicalLight.position.set(-6, -0.3, 54);
MusicalLight.rotation.set(0, 2.2, 0);
MusicalLight.intensity = 3;
MusicalLight.distance = 100;
MusicalLight.decay = 20;
scene.add(MusicalLight);

// const lightHelper = new THREE.PointLightHelper(CelestialLight);
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
  if (Logo.rotation.y > logoEndRotation)
  {
        Logo.rotation.y = logoStartRotation;
  }
  daniel.rotation.y += 0.002;
  EnKore.rotation.y += 0.008;
  Celestial.rotation.y += 0.008;
  zotZoomer.rotation.y += 0.008;
  MusicalMadness.rotation.y += 0.008;

  reSizeWindow();

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

//   renderer.render(scene, camera);
    composer.render();
}

animate();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showScreenAfterLoad() {
    console.log(objectsLoadedBools);
    if (Object.values(objectsLoadedBools).every((bool) => bool === true))
    {
        sleep(500).then(() => {
            document.getElementById("main").style.display = "block";
            console.log("loaded");
        });

    }
  }


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

        logoStartRotation = -0.05;
        logoEndRotation = 3.09;

        daniel.position.set(-10, 0, 86);
        daniel.scale.set(1, 1, 1); 
    }
    else if (currentWidth < 376)
    {
        Logo.scale.set(0.02, 0.02, 0.02);
        Logo.position.set(-0.3, 4.5, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 8, -9);

        logoStartRotation = -0.05;
        logoEndRotation = 3.09;

        daniel.position.set(-10, 0, 86);
        daniel.scale.set(1, 1, 1); 
    }
    else if (currentWidth < 401)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 6, -9);

        logoStartRotation = -0.1;
        logoEndRotation = 3.04;

        daniel.position.set(-8, 0, 78);
        daniel.scale.set(1, 1, 1);  
    }
    else if (currentWidth < 451)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 6, -9);

        logoStartRotation = -0.1;
        logoEndRotation = 3.04;

        daniel.position.set(-8, 0, 85);
        daniel.scale.set(1, 1, 1); 
    }
    else if (currentWidth < 501)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        Logo.rotation.z = 0;
        LogoLight.position.set(0, 6, -9);

        logoStartRotation = -0.1;
        logoEndRotation = 3.04;

        daniel.position.set(-5, 0, 81);
        daniel.scale.set(1, 1, 1);  
    }
    else if (currentWidth < 551)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        LogoLight.position.set(0, 6, -9);

        logoStartRotation = -0.1;
        logoEndRotation = 3.04;

        daniel.position.set(-5, -1.3, 81);
        daniel.scale.set(1, 1, 1);  
    }
    else if (currentWidth < 601)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        LogoLight.position.set(0, 6, -9);

        logoStartRotation = -0.1;
        logoEndRotation = 3.04;

        daniel.position.set(-5.7, -1.3, 72);
        daniel.scale.set(1, 1, 1);
    }
    else if (currentWidth < 769)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(0, 3, -10.5);
        LogoLight.position.set(0, 6, -9);

        logoStartRotation = -0.1;
        logoEndRotation = 3.04;

        daniel.position.set(-5.7, 0.15, 72);
        daniel.scale.set(1, 1, 1);
    }
    else if (currentWidth < 875)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(4.7, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-3, 0.15, 60);
        daniel.scale.set(1, 1, 1);
    }
    else if (currentWidth < 1025)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(5.7, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-3, 0.15, 60);
        daniel.scale.set(1, 1, 1);
    }
    else
    {
        Logo.scale.set(0.05, 0.05, 0.05);
        Logo.position.set(7.4, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-2, 0.15, 65.8);
        daniel.scale.set(1, 1, 1);
    }
}