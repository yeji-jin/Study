import * as THREE from 'three';
export default function printTree(){

    //실습 - 나무
    const tree = new THREE.Group();
    //나무_줄기
    const trunk = new THREE.Group(); //group 묶기
    const trunkMatarial = new THREE.MeshStandardMaterial({
        color:0xa38949,
    });
    const trunkGeometry = new THREE.CylinderGeometry(0.8,1,1.5);
    const trunk1 = new THREE.Mesh(trunkGeometry,trunkMatarial);
    const trunk2 = new THREE.Mesh(trunkGeometry,trunkMatarial);
    const trunk3 = new THREE.Mesh(trunkGeometry,trunkMatarial);
    const trunk4 = new THREE.Mesh(trunkGeometry,trunkMatarial);
    trunk2.position.set(0.1,1.3,0);
    trunk2.scale.set(0.9,0.9,0.9);
    trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
    trunk3.position.set(0.2,2.5,0);
    trunk3.scale.set(0.8,0.8,0.8);
    trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
    trunk4.position.set(0.3,3.5,0);
    trunk4.scale.set(0.7,0.7,0.7);
    trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
    trunk.add(trunk1);
    trunk.add(trunk2);
    trunk.add(trunk3);
    trunk.add(trunk4);
    // trunk.position.x = 2; //group 전체 조작가능
    tree.add(trunk); //group tree add

    //나무_나뭇잎
    const treeLeaf = new THREE.Group();
    const treeLeafMatarial = new THREE.MeshStandardMaterial({
        color:0x84ad88,
        side:THREE.DoubleSide
    })
    const treeLeafGometry = new THREE.SphereGeometry(2,32,16,Math.PI /3,Math.PI /3);
    const treeLeaf1 = new THREE.Mesh(treeLeafGometry,treeLeafMatarial);
    treeLeaf1.rotation.x = Math.PI / -2; //-90deg
    treeLeaf1.position.set(0,3,2);
    treeLeaf.add(treeLeaf1);

    const treeLeaf2 = new THREE.Mesh(treeLeafGometry,treeLeafMatarial);
    treeLeaf2.rotation.x = Math.PI / -2;
    treeLeaf2.rotation.z = Math.PI / 2;
    treeLeaf2.position.set(2, 3.2, 0);
    treeLeaf.add(treeLeaf2);

    const treeLeaf3 = new THREE.Mesh(treeLeafGometry,treeLeafMatarial);
    treeLeaf3.rotation.x = Math.PI / -2;
    treeLeaf3.rotation.z = Math.PI;
    treeLeaf3.position.set(0, 3.2, -2);
    treeLeaf.add(treeLeaf3);

    const treeLeaf4 = new THREE.Mesh(treeLeafGometry,treeLeafMatarial);
    treeLeaf4.rotation.x = Math.PI / -2;
    treeLeaf4.rotation.z = Math.PI / -2;
    treeLeaf4.position.set(-2, 3.2, 0);
    treeLeaf.add(treeLeaf4);

    treeLeaf.position.x = -0.4;
    treeLeaf.rotation.z = THREE.MathUtils.degToRad(-10);
    tree.add(treeLeaf);

    //tree group add
    tree.scale.set(0.5,0.5,0.5)
    // scene.add(tree); 

    return tree;
}