import * as THREE from 'three';
export default function printOrange(){

    //실습 - 한라봉
    const orange = new THREE.Group();
    const bodyMatarial = new THREE.MeshStandardMaterial({
        color:0xff7f00,
        // wireframe:true
    })
    const bottomGeometry = new THREE.DodecahedronGeometry(2,1);
    const bottom = new THREE.Mesh(bottomGeometry,bodyMatarial);
    orange.add(bottom);

    const topGeometry = new THREE.TetrahedronGeometry(0.8,3);
    const top = new THREE.Mesh(topGeometry,bodyMatarial);
    orange.add(top);
    top.position.y = 1.7;

    const leafMatarial = new THREE.MeshStandardMaterial({
        color:0x008000,
        side: THREE.DoubleSide
    })
    const leafSteamGometry = new THREE.CylinderGeometry(0.08, 0.1, 0.4);
    const leafSteam = new THREE.Mesh(leafSteamGometry,leafMatarial);
    orange.add(leafSteam);
    leafSteam.position.y = 2.5;

    const leafGometry = new THREE.SphereGeometry(0.5,32,16,0, Math.PI / 3);
    const leaf = new THREE.Mesh(leafGometry,leafMatarial);
    orange.add(leaf);
    leaf.position.set(-0.5, 2.4, -0.1);
    leaf.rotation.z = Math.PI / -2;

    orange.position.x = 3;
    orange.scale.set(0.3,0.3,0.3);
    // scene.add(orange);

    return orange;
}