import * as THREE from 'three';
import webGL from '../../node_modules/three/examples/jsm/capabilities/WebGL.js';

console.log(THREE);

// if(webGL.isWebGLAvailable()){
//     //three.js code
    
//     // 장면 생성
//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xFFE187)

//     const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(3, 3, 3);
//     camera.lookAt(0, 0, 0);

//     const renderer = new THREE.WebGLRenderer()
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // 빛
//     const ambientLight = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(ambientLight);

//     const pointLight = new THREE.PointLight(0xffffff, 1);
//     pointLight.position.set(0, 2, 4);
//     scene.add(pointLight);

//     // 박스
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     renderer.render(scene, camera);
// }else{
//     //지원x
//     document.body.appendChild(webGL.getWebGL2ErrorMessage());
// }

//-----02

const result = document.querySelector('#result');

//1. scene : 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd); //0x(color code)

//2. camera : scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1 , 1000);
// const camera = new THREE.PerspectiveCamera(50, result.clientWidth / result.clientHeight, 0.1 , 1000);
/**
    * (fov, aspect, near , far)
    - 시야각(fov) : 시야각이 커질수록 많은영역 출력 > 시야각이 커질 수록 객체가 작아보임  
                기본값은 50, 사람의 시야와 유사한 45~75 사이 값 사용

    - aspect: 카메라의 종횡비, 가로와 세로의 비율 > 보통 `window.innerWidth / window.innerHeight` 사용
    - near
    - far
*/  
camera.position.set(2,2,2); //camera position
camera.lookAt(0,0,0);//camera가 바라보는 방향 설정

//3. renderer : scene + camera, 화면을 그려줌
const renderer = new THREE.WebGLRenderer({
    canvas : result,
    antialias :true
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setSize(result.clientWidth, result.clientHeight);
// console.log(renderer);
// document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff); //빛 추가(색상이 보일 수 있게)
scene.add(light);
light.position.set(2,4,3);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color:0x2E6FFE2
})
const box = new THREE.Mesh(geometry,material);
scene.add(box); //장면에 추가

renderer.render(scene, camera); //scene과 camera의 정보를 담아 화면 출력

//animate
function animate(){
    box.rotation.y += 0.01;
    // console.log(box.rotation.y);
    renderer.render(scene,camera); // rendering
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

