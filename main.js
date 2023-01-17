import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';

// setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(55);
camera.position.setX(-5);
camera.position.setY(15);
renderer.render(scene, camera);

// Torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Text
const fontLoader = new FontLoader()
const ttfLoader = new TTFLoader();
ttfLoader.load('TokaiFont.ttf', (json) => {
  const tokaiFont = fontLoader.parse(json);

  // name
  const nameGeometry = new TextGeometry('Jack Youkstetter', {
    height: 4,
    size: 10,
    font: tokaiFont,
  });
  const nameMaterial = new THREE.MeshBasicMaterial({color: '0xffffff', wireframe: true});
  const name = new THREE.Mesh(nameGeometry, nameMaterial);

  // title
  const titleGeometry = new TextGeometry('Web Developer and ML Engineer', {
    height: 0.5,
    size: 3,
    font: tokaiFont,
  });
  const titleMaterial = new THREE.MeshBasicMaterial({color: '0xffffff', wireframe: true});
  const title = new THREE.Mesh(titleGeometry, titleMaterial);

  title.position.setZ(20)
  title.position.setX(-25)

  name.position.setX(-50)
  scene.add(name, title);
});





// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// controls
const controls = new OrbitControls(camera, renderer.domElement);


// animate function
function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;


  // controls.update();

  renderer.render(scene, camera);
}
animate();