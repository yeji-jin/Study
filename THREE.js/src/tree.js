import * as THREE from 'three';
import webGL from 'three/examples/jsm/capabilities/WebGL.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
console.log(THREE, OrbitControls);

import printTree from '../mesh/tree.js';
import printOrange from '../mesh/orange.js'


//-----03 : Geometry

const result = document.querySelector('#result');

//1. scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd); //0x(color code)

//2. camera : scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1 , 1000);
camera.position.set(0,10,20); //camera position
camera.lookAt(0,0,0);//camera가 바라보는 방향 설정

//3. renderer : scene + camera, 화면을 그려줌
const renderer = new THREE.WebGLRenderer({
    canvas : result,
    antialias :true
});
renderer.setSize(window.innerWidth, window.innerHeight);

//light
const light = new THREE.DirectionalLight(0xffffff); //빛 추가(색상이 보일 수 있게)
scene.add(light);
light.position.set(2,4,3);

//orange
const orange1 = printOrange();
scene.add(orange1);

//tree
const tree1 = printTree();
scene.add(tree1);


const axes = new THREE.AxesHelper(10);
scene.add(axes)


renderer.render(scene, camera); //scene과 camera의 정보를 담아 화면 출력

//OrbitControls
const controls = new OrbitControls(camera,renderer.domElement);
// 조작설정
// controls.enableZoom = false;
// controls.enableRotate = false;
// controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;
// controls.maxPolarAngle = Math.PI / 3;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 10; //- 반대값
controls.enableDamping = true; //회전 끝났을 떄 관성이 적용되어 부드러운 마무리

//animate
function animate(){
    renderer.render(scene,camera); // rendering
    controls.update()
    requestAnimationFrame(animate);
}
animate();

//resize
window.addEventListener('resize',()=>{
    // 1. 카메라의 종횡비
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 업데이트

    // 2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
})



