import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.156.0/build/three.module.js';

// --- Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

// Add some basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// --- Watch Components ---

// Watch Face
const faceGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 32);
const faceMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const watchFace = new THREE.Mesh(faceGeometry, faceMaterial);
scene.add(watchFace);

// Hour Hand
const hourHandGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
const hourHandMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const hourHand = new THREE.Mesh(hourHandGeometry, hourHandMaterial);
hourHand.position.y = 0.5;
hourHand.position.z = 0.06;
scene.add(hourHand);

// Minute Hand
const minuteHandGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
const minuteHandMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const minuteHand = new THREE.Mesh(minuteHandGeometry, minuteHandMaterial);
minuteHand.position.y = 0.75;
minuteHand.position.z = 0.07;
scene.add(minuteHand);

// Second Hand
const secondHandGeometry = new THREE.BoxGeometry(0.05, 1.8, 0.05);
const secondHandMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const secondHand = new THREE.Mesh(secondHandGeometry, secondHandMaterial);
secondHand.position.y = 0.9;
secondHand.position.z = 0.08;
scene.add(secondHand);

// --- Animation Loop ---
function animate() {
    requestAnimationFrame(animate);

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate rotation in radians (2 * PI is a full circle)
    const hourRotation = ((hours % 12 + minutes / 60) / 12) * Math.PI * 2;
    const minuteRotation = ((minutes + seconds / 60) / 60) * Math.PI * 2;
    const secondRotation = (seconds / 60) * Math.PI * 2;

    // Apply rotation to the hands
    // We rotate around the Z-axis, hence the Z-axis rotation
    hourHand.rotation.z = -hourRotation;
    minuteHand.rotation.z = -minuteRotation;
    secondHand.rotation.z = -secondRotation;

    renderer.render(scene, camera);
}

animate();

// --- Handle Window Resize ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});