import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { FBXLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';


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

const renderScene = new RenderPass(scene, camera);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);

// Update Trivia Text

const TriviaText = ["The first video game I ever played was Super Mario World on the Nintendo DS.", "My favorite game is The Binding Of Isaac, with over 800 hours under my belt.", "I can play jazz piano and want to open up my own jazz bar one day.", "I eat anywhere from 5-10 Persian cucumbers a day.", "I have a black belt in karate.", "I have a motorcycle license and have go riding once in a while.", "I have gone sky diving, and I would do it again.", "I have a pet chameleon. His name is Hue."]
var randomElementIndex = Math.floor(Math.random() * TriviaText.length);
var randomElement = TriviaText[randomElementIndex];

var DYKText = document.getElementById("DYKText");
var DYKButton = document.getElementById("more-arrows");

DYKText.innerText = "Fun Facts About Me: " + randomElement;

setTimeout(() => {
    DYKText.style.transition = "opacity 0.5s";
    DYKText.style.opacity = "1";
    DYKButton.addEventListener("click", updateDYKText);
}, 1000);

function updateDYKText() {
    DYKText.style.opacity = "0";
    DYKButton.removeEventListener("click", updateDYKText);
    setTimeout(() => {
        const newTriviaText = [...TriviaText];
        randomElementIndex = newTriviaText.indexOf(randomElement);
        newTriviaText.splice(randomElementIndex, 1);
        randomElementIndex = Math.floor(Math.random() * newTriviaText.length);
        randomElement = newTriviaText[randomElementIndex];
        DYKText.innerText = "Fun Facts About Me: " + randomElement;
        DYKText.style.opacity = "1";
        DYKButton.addEventListener("click", updateDYKText);
    }, 500);
}


// Loader
const loadingManager = new THREE.LoadingManager();
const fbxLoader = new FBXLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);

loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
}

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url);
}

const progressBarContainer = document.querySelector('.spinner-background');

loadingManager.onLoad = function () {
    showScreenAfterLoad();
}

loadingManager.onError = function (url) {
    console.log('There was an error loading ' + url);
}

// Custom Import

var FellChaser = new THREE.Mesh();
gltfLoader.load(
    './assets/FellChaser.glb',
    (gltf) => {
        FellChaser = gltf.scene;
        FellChaser.position.set(-9.5, -1, 7.3);
        FellChaser.rotation.set(0, -1, -0.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);
        scene.add(FellChaser);
    },
    (xhr) => {
    },
    (error) => {
        console.log(error);
    }
)

var EnKore = new THREE.Mesh();

fbxLoader.load(
    './assets/EnKore.fbx',
    (object) => {
        //object.position.set(-9, -2, 7.3) 
        //object.scale.set(0.007, 0.007, 0.007)

        EnKore = object;

        scene.add(EnKore)
    },
    (xhr) => {
    },
    (error) => {
        console.log(error);
    }
)

var Celestial = new THREE.Mesh();

fbxLoader.load(
    './assets/CC.fbx',
    (object) => {

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
    },
    (error) => {
        console.log(error);
    }
)

var MusicalMadness = new THREE.Mesh();

// fbxLoader.load(
//     './assets/MM.fbx',
//     (object) => {
//         object.position.set(-10, -0.3, 50)
//         object.rotation.set(0, 0, 0)
//         object.scale.set(0.03, 0.03, 0.03)

//         const material = new THREE.MeshStandardMaterial({
//             color: 0xffffff, // Base color
//             roughness: 0.5,    // Roughness (1 for completely rough)
//             metalness: 0,    // Metalness (0 for non-metallic)
//         });

//         const textureLoader = new THREE.TextureLoader();
//         material.map = textureLoader.load(MMPic);
//         material.map.encoding = THREE.sRGBEncoding;

//         object.traverse(function(child) {
//             if (child.isMesh) {
//                 child.material = material; 
//             }
//         });

//         MusicalMadness = object;

//         scene.add(MusicalMadness)
//     },
//     (xhr) => {
//     },
//     (error) => {
//         console.log(error);
//     }
// )

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
        // sleep(5000).then(() => {
        //     showScreenAfterLoad();
        //     console.log("Sleep Loaded");
        // });
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

daniel.position.set(-2, 0.15, 65.8);

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
LogoLight.position.set(3, 2, -5);
LogoLight.rotation.set(1, 10, 4);
LogoLight.intensity = 8;
LogoLight.distance = 60;
LogoLight.decay = 15;
scene.add(LogoLight);

// FellChaser Light
const FellChaserLight = new THREE.PointLight(0x00ffff);
FellChaserLight.position.set(-9.2, 3.5, 5); 
//FellChaserLight.rotation.set(0, 2.2, 0);
FellChaserLight.intensity = 3;
FellChaserLight.distance = 100;
FellChaserLight.decay = 20;
scene.add(FellChaserLight);

// Enkore Light
const EnkoreLight = new THREE.PointLight(0xffffff);
EnkoreLight.position.set(-10.8, 8, 22); // 0, +10, 0
EnkoreLight.rotation.set(0, 2.2, 0);
EnkoreLight.intensity = 8;
EnkoreLight.distance = 100;
EnkoreLight.decay = 20;
scene.add(EnkoreLight);

// Celestial Light
const CelestialLight = new THREE.PointLight(0xffffff);
CelestialLight.position.set(-13, 0, 40);  //0, 0, +5
CelestialLight.rotation.set(0, 2.2, 0);
CelestialLight.intensity = 3;
CelestialLight.distance = 100;
CelestialLight.decay = 20;
scene.add(CelestialLight);

// Zot Light
const ZotLight = new THREE.PointLight(0xffffff);
ZotLight.position.set(-12, 7.7, 49); // 0, -8, 0
ZotLight.rotation.set(0, 2.2, 0);
ZotLight.intensity = 8;
ZotLight.distance = 100;
ZotLight.decay = 20;
scene.add(ZotLight);

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
  if (Logo.rotation.y > logoEndRotation)
  {
        Logo.rotation.y = logoStartRotation;
  }
  daniel.rotation.y += 0.002;
  EnKore.rotation.y += 0.008;
  Celestial.rotation.y += 0.008;
  zotZoomer.rotation.y += 0.008;
  MusicalMadness.rotation.y += 0.008;
  FellChaser.rotation.y += 0.008;

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
    progressBarContainer.style.display = 'none';
    document.getElementById("main").style.display = "block";
    console.log("loaded");
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
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
        
        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
 
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
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

        FellChaser.position.set(-9, -2, 7.3);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
    }
    else if (currentWidth < 875)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(4.7, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-3, 0.15, 60);
        daniel.scale.set(1, 1, 1);

        FellChaser.position.set(-13, 0, 20);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);
    }
    else if (currentWidth < 1025)
    {
        Logo.scale.set(0.03, 0.03, 0.03);
        Logo.position.set(5.7, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-3, 0.15, 60);
        daniel.scale.set(1, 1, 1);

        FellChaser.position.set(-13, 0, 20);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-13, -4, 18);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-13, -0.7, 32.8);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-10, -0.3, 50);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);

        console.log("less than 1025");
    }
    else if (currentWidth < 1849)
    {
        Logo.scale.set(0.05, 0.05, 0.05);
        Logo.position.set(7.4, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-2, 0.15, 67);
        daniel.scale.set(1, 1, 1);

        FellChaser.position.set(-10.5, -1.5, 5.8);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-11.5, -2, 22);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-14, 0, 36);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-14, -0.3, 52);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        //MusicalMadness.position.set(-10, -0.3, 50);
        //MusicalMadness.scale.set(0.03, 0.03, 0.03);

        console.log("less than 1849")
    }
    else if (currentWidth < 1921)
    {
        Logo.scale.set(0.05, 0.05, 0.05);
        Logo.position.set(7.4, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-2, 0.15, 65);
        daniel.scale.set(1, 1, 1);

        FellChaser.position.set(-9.8, -1.5, 6.7);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-10, -2, 22.3);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-14, 0, 35);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-12, 0, 49);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        // MusicalMadness.position.set(-10, 0, 49);
        // MusicalMadness.scale.set(0.03, 0.03, 0.03);

        console.log("less than 1921");
    }
    else
    {
        Logo.scale.set(0.05, 0.05, 0.05);
        Logo.position.set(7.4, 0, -13.5);

        logoStartRotation = -0.5;
        logoEndRotation = 2.64;

        daniel.position.set(-2, 0.15, 65);
        daniel.scale.set(1, 1, 1);

        FellChaser.position.set(-9.8, -1.5, 6.7);
        FellChaser.scale.set(1.8, 1.8, 1.8);

        EnKore.position.set(-10, -2, 22.3);
        EnKore.scale.set(0.007, 0.007, 0.007);

        Celestial.position.set(-14, 0, 35);
        Celestial.scale.set(0.0035, 0.0035, 0.0035);

        zotZoomer.position.set(-12, 0, 49);
        zotZoomer.scale.set(1.1, 1.1, 1.1);

        // MusicalMadness.position.set(-10, 0, 49);
        // MusicalMadness.scale.set(0.03, 0.03, 0.03);

        console.log("Other");
    }

}