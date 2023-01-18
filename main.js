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
camera.position.setX(-20);
camera.position.setY(-2);
renderer.render(scene, camera);

// Torus
const geometryT = new THREE.TorusGeometry(60, 60, 60, 60);
const materialT = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
const torus = new THREE.Mesh(geometryT, materialT);
torus.position.setY(30)
torus.position.setX(20)
scene.add(torus);

// Sphere
// const geometryC = new THREE.SphereGeometry(5, 1.5, 8, 50);
// const materialC = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });
// const sphere = new THREE.Mesh(geometryC, materialC);
// sphere.position.setY(30)
// sphere.position.setX(-220)
// scene.add(sphere);

// Text
const fontLoader = new FontLoader()
const ttfLoader = new TTFLoader();
ttfLoader.load('Roboto-Bold.ttf', (json) => {
  const tokaiFont = fontLoader.parse(json);
    // drag to look around
    const scrollGeometry = new TextGeometry('<- drag to look around ->', {
      height: 0.2,
      size: 1,
      font: tokaiFont,
    });
    const scrollMaterial = new THREE.MeshBasicMaterial({color: 'white'});
    const scroll = new THREE.Mesh(scrollGeometry, scrollMaterial);

  // name
  const nameGeometry = new TextGeometry('Jack Youkstetter', {
    height: 1,
    size: 6,
    font: tokaiFont,
  });
  const nameMaterial = new THREE.MeshBasicMaterial({color: 'lightblue'});
  const name = new THREE.Mesh(nameGeometry, nameMaterial);

  // title
  const titleGeometry = new TextGeometry('Web Developer and ML Engineer', {
    height: 0.5,
    size: 2,
    font: tokaiFont,
  });
  const titleMaterial = new THREE.MeshBasicMaterial({color: 'gray'});
  const title = new THREE.Mesh(titleGeometry, titleMaterial);

  name.position.setX(-40)
  name.position.setY(0)
  // title.position.setZ(20)
  title.position.setX(-40)
  title.position.setY(-5)

  scroll.position.setX(-10)
  scroll.position.setY(10);
  scroll.position.setZ(0);

  scene.add(name, title);


});





// Lights
const pointLight = new THREE.PointLight();
pointLight.position.set(20, 15, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, )

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// animate function
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();
  // console.log(camera.position)


  renderer.render(scene, camera);
}
animate();