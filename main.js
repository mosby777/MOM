import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { PointerLockControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 1.6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener('click', () => controls.lock());
scene.add(controls.getObject());

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 5, 0);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x222222 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Wall
const wall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 5, 1),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
wall.position.set(0, 2.5, -10);
scene.add(wall);

// Meme Frame
const meme = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
meme.position.set(-3, 2.5, -9.5);
scene.add(meme);

// Secret Door
const door = new THREE.Mesh(
  new THREE.BoxGeometry(2, 4, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x550000 })
);
door.position.set(3, 2, -9.5);
scene.add(door);

// Raycasting
const raycaster = new THREE.Raycaster();

window.addEventListener('click', () => {
  raycaster.setFromCamera({ x: 0, y: 0 }, camera);
  const hits = raycaster.intersectObjects([meme, door]);

  hits.forEach(hit => {
    if (hit.object === meme) {
      alert("Doge (2013)\nPlatform: Reddit\nImpact: Legendary");
    }
    if (hit.object === door) {
      enterBrainRot();
    }
  });
});

// Brain Rot Room
function enterBrainRot() {
  scene.background = new THREE.Color(0x000000);
  camera.position.set(0, 1.6, 5);

  for (let i = 0; i < 30; i++) {
    const chaos = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff
      })
    );
    chaos.position.set(
      (Math.random() - 0.5) * 10,
      Math.random() * 5,
      (Math.random() - 0.5) * 10
    );
    scene.add(chaos);
  }

  alert("🧠 You have entered the Brain Rot Wing.");
}

// Movement
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = {};

document.addEventListener('keydown', e => keys[e.code] = true);
document.addEventListener('keyup', e => keys[e.code] = false);

function animate() {
  requestAnimationFrame(animate);

  direction.z = Number(keys['KeyW']) - Number(keys['KeyS']);
  direction.x = Number(keys['KeyD']) - Number(keys['KeyA']);
  direction.normalize();

  velocity.x = direction.x * 0.1;
  velocity.z = direction.z * 0.1;

  controls.moveRight(velocity.x);
  controls.moveForward(velocity.z);

  renderer.render(scene, camera);
}

animate();
