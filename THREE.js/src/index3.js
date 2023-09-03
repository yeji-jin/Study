import * as THREE from 'three';
import webGL from 'three/examples/jsm/capabilities/WebGL.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
console.log(THREE, OrbitControls);


//-----03 : Geometry

const result = document.querySelector('#result');

//1. scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd); //0x(color code)

//2. camera : scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1 , 1000);
camera.position.set(5,5,5); //camera position
camera.lookAt(0,0,0);//camera가 바라보는 방향 설정

//3. renderer : scene + camera, 화면을 그려줌
const renderer = new THREE.WebGLRenderer({
    canvas : result,
    antialias :true
});
renderer.setSize(window.innerWidth, window.innerHeight);

const light = new THREE.DirectionalLight(0xffffff); //빛 추가(색상이 보일 수 있게)
scene.add(light);
light.position.set(2,4,3);


const material = new THREE.MeshStandardMaterial({
    color:0x2E6FFE2
})
/**
 geometry - 형태
 material - 재질
 */

//육면체
const geo1 = new THREE.BoxGeometry(1,1,1); //width height depth (x,y,z)
const obj1 = new THREE.Mesh(geo1,material);
// scene.add(obj1);

//원뿔
const geo2 = new THREE.ConeGeometry(0.5,1,8); //반지름, 높이, 밑면의 둘레를 기준으로 분할된 면의 갯수(기본32)
// const geo2 = new THREE.ConeGeometry(0.5,1,32); //반지름, 높이, 밑면의 둘레를 기준으로 분할된 면의 갯수(기본32)
const obj2 = new THREE.Mesh(geo2,material);
// scene.add(obj2);

//원기둥
const geo3 = new THREE.CylinderGeometry(0.4,0.5,1); //윗면 반지름, 아랫면 반지름, 높이
const obj3 = new THREE.Mesh(geo3,material);
// scene.add(obj3);

//구
const geo4 = new THREE.SphereGeometry(1); //반지름값
const obj4 = new THREE.Mesh(geo4,material);
// scene.add(obj4);

//평면
const geo5 = new THREE.PlaneGeometry(1,2); //width height
const obj5 = new THREE.Mesh(geo5,material);
// scene.add(obj5);

//평면 원
const geo6 = new THREE.CircleGeometry(1,32); 
const obj6 = new THREE.Mesh(geo6,material);
// scene.add(obj6);

//도넛
const geo7 = new THREE.TorusGeometry(1,0.3); //반지름, 튜브의 반경
const obj7 = new THREE.Mesh(geo7,material);
// scene.add(obj7);


//----- 04. Matarial

//basic matarial
const basicBox = new THREE.BoxGeometry(1,1,1); 
const basic = new THREE.MeshBasicMaterial({ //빛에 영향x , 단색,  명암표현x
    color:0x2e6ff2,
    // wireframe: true,
    transparent:true,
    opacity:0.5
})
const basicMesh = new THREE.Mesh(basicBox,basic);
// scene.add(basicMesh);

//standard matarial
const standardBox = new THREE.BoxGeometry(1,1,1); 
const standard = new THREE.MeshStandardMaterial({ //빛에 영향o , 단색x, 명암표현o
    color:0x2e6ff2,
    roughness:0.2,
    metalness: 0.8, //금속 질감표현
    side:THREE.DoubleSide
})
const standardMesh = new THREE.Mesh(standardBox,standard);
scene.add(standardMesh);

//physical matarial 
const physicalBox = new THREE.BoxGeometry(1,1,1); 
const physical = new THREE.MeshPhysicalMaterial({ 
    color:0xDD4A68,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2
})
const physicalMesh = new THREE.Mesh(physicalBox,physical);
// scene.add(physicalMesh);

//phong matarial 
const phongBox = new THREE.BoxGeometry(1,1,1); 
const phong = new THREE.MeshPhysicalMaterial({ 
    color:0xDD4A62,
    shininess:30,
    specular:0x2e6ff2,
})
const phongMesh = new THREE.Mesh(phongBox,phong);
// scene.add(phongMesh);


// ----- 05.Mesh
const tmp_geo = new THREE.DodecahedronGeometry(1);
const tmp_matarial = new THREE.MeshStandardMaterial({
    color:0xDD4A62,
});
const tmp_mesh = new THREE.Mesh(tmp_geo,tmp_matarial);
scene.add(tmp_mesh);

//mesh 위치조작
// tmp_mesh.position.x = 2;
// tmp_mesh.position.y = 2;
tmp_mesh.position.set(2,2,4); //x,y,z축

//mesh 회전
// tmp_mesh.rotation.y = 360;
tmp_mesh.rotation.y = THREE.MathUtils.degToRad(36);

//mesh scale (1보다 크면 확대, 1보다 작으면 축소)
tmp_mesh.scale.x = 1.2;
tmp_mesh.scale.z = 0.8;


//axesHelper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

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
controls.autoRotate = true;
controls.autoRotateSpeed = 10; //- 반대값
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



