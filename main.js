import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let controls;
let objToRender = 'planeta';

const loader = new GLTFLoader();

// Zmieniona ścieżka do modelu 'planeta' w folderze 'sem 5'
loader.load(
'model/planeta.gltf',  // Ścieżka do twojego modelu
  function (gltf) {
    object = gltf.scene;
    object.scale.set(10, 10, 10);        // Załaduj model do zmiennej "object"
    scene.add(object);          // Dodaj model do sceny
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');  // Informacje o postępie
  },
  function (error) {
    console.error(error);       // Obsługa błędów ładowania
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Ustawienie kamery w zależności od obiektu
camera.position.z = objToRender === "planeta" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0x99810a, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "planeta" ? 5 : 1);
scene.add(ambientLight);

// Sprawdzenie, czy obiekt to 'planeta', jeśli tak, włącz OrbitControls
if (objToRender === "planeta") {
  controls = new OrbitControls(camera, renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  
  // Animacja obiektu, obrót modelu
  if (object) {
    object.rotation.y += 0.005; // Obrót wokół osi Y
  }
  
  renderer.render(scene, camera);
}

// Obsługa zmiany rozmiaru okna
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();{
   
  
    renderer.render(scene, camera);
  }
  
