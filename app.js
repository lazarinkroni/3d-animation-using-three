// Variables for setup

let container;
let camera;
let renderer;
let scene;
let car;

function init(){
    container = document.querySelector('.scene');

    // Create Scene 
    scene = new THREE.Scene();
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.3;
    const far = 500;

    // Camera Setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 3);

    // Adding Lights
    const ambient = new THREE.AmbientLight(0x404040, 90);
    scene.add(ambient);

    // Adding a directional lights
    const light = new THREE.DirectionalLight(0xffffff, 4);
    light.position.set(10 ,10, 40);
    scene.add(light);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Append the container to the HTML page.
    container.appendChild(renderer.domElement);

    // Load The Model 
    let loader = new THREE.GLTFLoader();
    loader.load('./3d/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        car = gltf.scene.children[0];
        animate();
    })
}
// Animate using rotation function

function animate() {
    requestAnimationFrame(animate);
    car.rotation.z += 0.005;
    renderer.render(scene, camera);
}

init();

// Resizing on devices

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}
window.addEventListener('resize', onWindowResize);