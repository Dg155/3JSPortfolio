import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { FBXLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';
import { RenderPass } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/postprocessing/EffectComposer.js';


// Setup

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-3, 0, 30);

const canvas   = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Asset Loading

const loadingManager = new THREE.LoadingManager();
const fbxLoader      = new FBXLoader(loadingManager);
const gltfLoader     = new GLTFLoader(loadingManager);

loadingManager.onStart    = (url, loaded, total) => console.log(`Loading ${url} (${loaded}/${total})`);
loadingManager.onProgress = (url)                => console.log(`Progress: ${url}`);
loadingManager.onError    = (url)                => console.error(`Error loading ${url}`);
loadingManager.onLoad     = ()                   => showScreenAfterLoad();

const progressBarContainer = document.querySelector('.spinner-background');

// Responsive layout data
//
// Each entry covers widths UP TO (but not including) the next breakpoint.
// Properties:
//   logoScale        – uniform scale for the Logo FBX
//   logoPos          – [x, y, z] world position
//   logoStartRot     – y-rotation reset value  (logo pendulum)
//   logoEndRot       – y-rotation clamp value
//   danielPos        – [x, y, z] world position for the headshot cube
//   danielScale      – uniform scale (almost always 1)
//   // All other models share the same positions across most breakpoints;
//   // only the values that actually differ are listed per breakpoint.
//   fellChaserPos    – [x, y, z]
//   fellChaserScale  – uniform
//   enKorePos        – [x, y, z]
//   enKoreScale      – uniform
//   celestialPos     – [x, y, z]
//   celestialScale   – uniform
//   zotZoomerPos     – [x, y, z]
//   zotZoomerScale   – uniform

const BREAKPOINTS = [
    // ≤ 250 px
    {
        maxWidth: 250,
        logoScale: 0.015, logoPos: [-0.3, 4.5, -10.5], logoRotZ: 0,
        logoStartRot: -0.05, logoEndRot: 3.09,
        logoLightPos: [0, 8, -9],
        danielPos: [-10, 0, 86],       danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 375 px  (most phones portrait)
    {
        maxWidth: 375,
        logoScale: 0.02, logoPos: [-0.3, 4.5, -10.5], logoRotZ: 0,
        logoStartRot: -0.05, logoEndRot: 3.09,
        logoLightPos: [0, 8, -9],
        danielPos: [-10, 0, 86],       danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 400 px
    {
        maxWidth: 400,
        logoScale: 0.03, logoPos: [0, 3, -10.5], logoRotZ: 0,
        logoStartRot: -0.1, logoEndRot: 3.04,
        logoLightPos: [0, 6, -9],
        danielPos: [-8, 0, 78],        danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 450 px
    {
        maxWidth: 450,
        logoScale: 0.03, logoPos: [0, 3, -10.5], logoRotZ: 0,
        logoStartRot: -0.1, logoEndRot: 3.04,
        logoLightPos: [0, 6, -9],
        danielPos: [-8, 0, 85],        danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 500 px
    {
        maxWidth: 500,
        logoScale: 0.03, logoPos: [0, 3, -10.5], logoRotZ: 0,
        logoStartRot: -0.1, logoEndRot: 3.04,
        logoLightPos: [0, 6, -9],
        danielPos: [-5, 0, 81],        danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 550 px
    {
        maxWidth: 550,
        logoScale: 0.03, logoPos: [0, 3, -10.5], logoRotZ: 0,
        logoStartRot: -0.1, logoEndRot: 3.04,
        logoLightPos: [0, 6, -9],
        danielPos: [-5, -1.3, 81],     danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 600 px
    {
        maxWidth: 600,
        logoScale: 0.03, logoPos: [0, 3, -10.5], logoRotZ: 0,
        logoStartRot: -0.1, logoEndRot: 3.04,
        logoLightPos: [0, 6, -9],
        danielPos: [-5.7, -1.3, 72],   danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 768 px  (tablet portrait)
    {
        maxWidth: 768,
        logoScale: 0.03, logoPos: [0, 3, -10.5], logoRotZ: 0,
        logoStartRot: -0.1, logoEndRot: 3.04,
        logoLightPos: [0, 6, -9],
        danielPos: [-5.7, 0.15, 72],   danielScale: 1,
        fellChaserPos: [-9, -2, 7.3],  fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 874 px
    {
        maxWidth: 874,
        logoScale: 0.03, logoPos: [4.7, 0, -13.5], logoRotZ: undefined,
        logoStartRot: -0.5, logoEndRot: 2.64,
        logoLightPos: undefined,
        danielPos: [-3, 0.15, 60],     danielScale: 1,
        fellChaserPos: [-13, 0, 20],   fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 1024 px  (tablet landscape / small laptop)
    {
        maxWidth: 1024,
        logoScale: 0.03, logoPos: [5.7, 0, -13.5], logoRotZ: undefined,
        logoStartRot: -0.5, logoEndRot: 2.64,
        logoLightPos: undefined,
        danielPos: [-3, 0.15, 60],     danielScale: 1,
        fellChaserPos: [-13, 0, 20],   fellChaserScale: 1.8,
        enKorePos: [-13, -4, 18],      enKoreScale: 0.007,
        celestialPos: [-13, -0.7, 32.8], celestialScale: 0.0035,
        zotZoomerPos: [-10, -0.3, 50], zotZoomerScale: 1.1,
    },
    // ≤ 1848 px  (standard desktop)
    {
        maxWidth: 1848,
        logoScale: 0.05, logoPos: [7.4, 0, -13.5], logoRotZ: undefined,
        logoStartRot: -0.5, logoEndRot: 2.64,
        logoLightPos: undefined,
        danielPos: [-2, 0.15, 67],     danielScale: 1,
        fellChaserPos: [-10.5, -1.5, 5.8], fellChaserScale: 1.8,
        enKorePos: [-11.5, -2, 22],    enKoreScale: 0.007,
        celestialPos: [-14, 0, 36],    celestialScale: 0.0035,
        zotZoomerPos: [-14, -0.3, 52], zotZoomerScale: 1.1,
    },
    // ≤ 1920 px  (Full HD)
    {
        maxWidth: 1920,
        logoScale: 0.05, logoPos: [7.4, 0, -13.5], logoRotZ: undefined,
        logoStartRot: -0.5, logoEndRot: 2.64,
        logoLightPos: undefined,
        danielPos: [-2, 0.15, 65],     danielScale: 1,
        fellChaserPos: [-9.8, -1.5, 6.7], fellChaserScale: 1.8,
        enKorePos: [-10, -2, 22.3],    enKoreScale: 0.007,
        celestialPos: [-14, 0, 35],    celestialScale: 0.0035,
        zotZoomerPos: [-12, 0, 49],    zotZoomerScale: 1.1,
    },
    // > 1920 px  (2K / 4K)
    {
        maxWidth: Infinity,
        logoScale: 0.05, logoPos: [7.4, 0, -13.5], logoRotZ: undefined,
        logoStartRot: -0.5, logoEndRot: 2.64,
        logoLightPos: undefined,
        danielPos: [-2, 0.15, 65],     danielScale: 1,
        fellChaserPos: [-9.8, -1.5, 6.7], fellChaserScale: 1.8,
        enKorePos: [-10, -2, 22.3],    enKoreScale: 0.007,
        celestialPos: [-14, 0, 35],    celestialScale: 0.0035,
        zotZoomerPos: [-12, 0, 49],    zotZoomerScale: 1.1,
    },
];

// Texture image helper function

const textureLoader = new THREE.TextureLoader();

function loadTex(id, encoding = THREE.sRGBEncoding) {
    const src = document.getElementById(id).src;
    const tex = textureLoader.load(src);
    tex.encoding = encoding;
    return tex;
}

// Logo rotation bounds – updated by applyBreakpoint()
let logoStartRotation = -0.5;
let logoEndRotation   = 2.64;

// Update Trivia Text
const TRIVIA = [
    "The first video game I ever played was Super Mario World on the Nintendo DS.",
    "My favorite game is The Binding Of Isaac, with over 600 hours under my belt.",
    "I can play jazz piano and want to open up my own jazz bar one day.",
    "I eat anywhere from 5-10 Persian cucumbers a day.",
    "I have a black belt in karate.",
    "I have a motorcycle license and go riding once in a while.",
    "I have gone sky diving, and I would do it again.",
    "I once had a pet chameleon. His name was Hue.",
];

let triviaPool = []; // Keep a shuffled copy so every item shows before repeating

function nextTrivia() {
    if (triviaPool.length === 0) {
        triviaPool = [...TRIVIA].sort(() => Math.random() - 0.5);
    }
    return triviaPool.pop();
}

const DYKText = document.getElementById("DYKText");
const DYKButton = document.getElementById("more-arrows");

DYKText.innerText = "Fun Facts About Me: " + nextTrivia();

setTimeout(() => {
    DYKText.style.transition = "opacity 0.5s";
    DYKText.style.opacity = "1";
    DYKButton.addEventListener("click", cycleDYKText);
}, 1000);

function cycleDYKText() {
    DYKText.style.opacity = "0";
    DYKButton.removeEventListener("click", cycleDYKText);
    setTimeout(() => {
        DYKText.innerText = "Fun Facts About Me: " + nextTrivia();
        DYKText.style.opacity = "1";
        DYKButton.addEventListener("click", cycleDYKText);
    }, 500);
}

// Custom Import

// 3-D Model Imports

// FellChaser (GLTF)
let FellChaser = new THREE.Mesh();
gltfLoader.load(
    './assets/FellChaser.glb',
    ({ scene: gltfScene }) => {
        FellChaser = gltfScene;
        FellChaser.position.set(-9.5, -1, 7.3);
        FellChaser.rotation.set(0, -1, -0.3);
        FellChaser.scale.setScalar(1.8);
        scene.add(FellChaser);
    },
    undefined,
    (err) => console.error(err)
);

// EnKore (FBX)
let EnKore = new THREE.Mesh();
fbxLoader.load(
    './assets/EnKore.fbx',
    (object) => {
        EnKore = object;
        scene.add(EnKore);
    },
    undefined,
    (err) => console.error(err)
);

// Celestial Chaser (FBX) – single shared material
let Celestial = new THREE.Mesh();
fbxLoader.load(
    './assets/CC.fbx',
    (object) => {
        const mat = new THREE.MeshStandardMaterial({
            map:       loadTex('CCTexture'),
            roughness: 0.5,
            metalness: 0.5,
        });
        object.traverse((child) => { if (child.isMesh) child.material = mat; });
        Celestial = object;
        scene.add(Celestial);
    },
    undefined,
    (err) => console.error(err)
);

// Zot Zoomer (FBX)
let zotZoomer = new THREE.Mesh();
fbxLoader.load(
    './assets/Car.fbx',
    (object) => {
        object.position.set(-13, -0.7, 32.8);
        object.rotation.set(0.8, 0, 0);
        object.scale.setScalar(1.1);

        const mat = new THREE.MeshStandardMaterial({
            map:           loadTex('CarTexture'),
            normalMap:     textureLoader.load(document.getElementById('CarTextureNormal').src),
            roughnessMap:  textureLoader.load(document.getElementById('CarTextureRoughness').src),
            metalnessMap:  textureLoader.load(document.getElementById('CarTextureMetallic').src),
            displacementMap:   textureLoader.load(document.getElementById('CarTextureHeight').src),
            displacementScale: 0,
            roughness: 1,
            metalness: 0,
        });
        object.traverse((child) => { if (child.isMesh) child.material = mat; });
        zotZoomer = object;
        scene.add(zotZoomer);
    },
    undefined,
    (err) => console.error(err)
);

// Logo (FBX)
let Logo = new THREE.Mesh();
fbxLoader.load(
    './assets/Logo.fbx',
    (object) => {
        object.position.set(7.4, 0, -13.5);
        object.scale.setScalar(0.05);

        const logoTex = loadTex('LogoTexture');
        object.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map:      logoTex,
                    roughness: 0,
                    metalness: 0,
                    side: THREE.DoubleSide,
                });
            }
        });
        Logo = object;
        scene.add(Logo);
    },
    undefined,
    (err) => console.error(err)
);

// Background

scene.background = loadTex('grid');

// Avatar (spinning cube)

const daniel = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: loadTex('headshot') })
);
daniel.position.set(-2, 0.15, 65.8);
daniel.rotation.z = -0.02;
scene.add(daniel);

// Moon (not currently added to scene but kept for future use)

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map:       loadTex('moon'),
        normalMap: loadTex('moonnormal'),
    })
);
// scene.add(moon);

// Lights

function makePointLight(hex, intensity, distance, decay, pos) {
    const light = new THREE.PointLight(hex, intensity, distance, decay);
    light.position.set(...pos);
    scene.add(light);
    return light;
}

const LogoLight = makePointLight(0xffffff, 8,  60,  15, [3,     2,   -5  ]);
const FellChaserLight = makePointLight(0x00ffff, 3,  100, 20, [-9.2,  3.5,  5  ]);
const EnkoreLight = makePointLight(0xffffff, 8,  100, 20, [-10.8, 8,   22  ]);
const CelestialLight = makePointLight(0xffffff, 3,  100, 20, [-13,   0,   40  ]);
const ZotLight = makePointLight(0xffffff, 8,  100, 20, [-12,   7.7, 49  ]);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Move Camera With Scroll

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.02;
    camera.position.x = t *  0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.addEventListener('scroll', moveCamera, { passive: true });
moveCamera();

// Responsive layout

function getBreakpoint(width) {
    return BREAKPOINTS.find((bp) => width <= bp.maxWidth);
}

function applyBreakpoint() {
    const bp = getBreakpoint(window.innerWidth);

    // Logo
    Logo.scale.setScalar(bp.logoScale);
    Logo.position.set(...bp.logoPos);
    if (bp.logoRotZ !== undefined) Logo.rotation.z = bp.logoRotZ;
    if (bp.logoLightPos) LogoLight.position.set(...bp.logoLightPos);

    logoStartRotation = bp.logoStartRot;
    logoEndRotation   = bp.logoEndRot;

    // Avatar
    daniel.position.set(...bp.danielPos);
    daniel.scale.setScalar(bp.danielScale);

    // Models – only update if they have been loaded (not still default Mesh)
    if (FellChaser.position) {
        FellChaser.position.set(...bp.fellChaserPos);
        FellChaser.scale.setScalar(bp.fellChaserScale);
    }
    if (EnKore.position) {
        EnKore.position.set(...bp.enKorePos);
        EnKore.scale.setScalar(bp.enKoreScale);
    }
    if (Celestial.position) {
        Celestial.position.set(...bp.celestialPos);
        Celestial.scale.setScalar(bp.celestialScale);
    }
    if (zotZoomer.position) {
        zotZoomer.position.set(...bp.zotZoomerPos);
        zotZoomer.scale.setScalar(bp.zotZoomerScale);
    }
}

// Debounce resize so it fires once per resize gesture
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Update renderer + camera aspect
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Apply layout
        applyBreakpoint();
    }, 100);
}, { passive: true });

// Renderer resize helper

function resizeRendererToDisplaySize(renderer) {
    const canvas     = renderer.domElement;
    const needResize = canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight;
    if (needResize) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    return needResize;
}

// Animation loop

const SPIN_SPEED = 0.008;

function animate() {
    requestAnimationFrame(animate);

    moon.rotation.x += 0.005;
    daniel.rotation.y += 0.002;

    Logo.rotation.y += SPIN_SPEED;
    if (Logo.rotation.y > logoEndRotation) Logo.rotation.y = logoStartRotation;

    EnKore.rotation.y      += SPIN_SPEED;
    Celestial.rotation.y   += SPIN_SPEED;
    zotZoomer.rotation.y   += SPIN_SPEED;
    FellChaser.rotation.y  += SPIN_SPEED;

    resizeRendererToDisplaySize(renderer);
    composer.render();
}

// Utilities

function showScreenAfterLoad() {
    progressBarContainer.style.display = 'none';
    document.getElementById("main").style.display = "block";
    // Apply the correct layout now that models are in the scene
    applyBreakpoint();
    console.log("All assets loaded.");
}

animate();
