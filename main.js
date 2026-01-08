import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls for mobile & desktop
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.target.set(0, 2, 0);
controls.update();

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

// Grid helper to see floor
const grid = new THREE.GridHelper(50, 50);
scene.add(grid);

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

// Raycaster
const raycaster = new THREE.Raycaster();

// Universal click/tap function
function interact(event) {
  let x, y;

  if (event.touches) {
    // mobile touch
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else {
    // desktop click
    x = event.clientX;
    y = event.clientY;
  }

  const pointer = new THREE.Vector2();
  pointer.x = (x / window.innerWidth) * 2 - 1;
  pointer.y = -(y / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects([meme, door]);

  hits.forEach(hit => {
    if (hit.object === meme) {
      alert("Doge (2013)\nPlatform: Reddit\nImpact: Legendary");
    }
    if (hit.object === door) {
      enterBrainRot();
    }
  });
}

// Attach both click and touchstart
window.addEventListener('click', interact);
window.addEventListener('touchstart', interact);

// Brain Rot Room
function enterBrainRot() {
  scene.background = new THREE.Color(0x000000);
  camera.position.set(0, 1.6, 5);

  for (let i = 0; i < 30; i++) {
    const chaos = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
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

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
