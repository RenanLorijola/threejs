import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cor = new THREE.Color(0xff0000)

const circle = new THREE.CylinderGeometry(20, 10, 50, 1000, 500)
const material = new THREE.LineBasicMaterial( { color: cor } );
const circleMesh = new THREE.Mesh( circle, material )
scene.add(circleMesh);

camera.position.set( 0, 0, 100 );

renderer.render( scene, camera );

class Mouse {
    mouseX = 0
    mouseY = 0

    constructor(mouseX, mouseY) {
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }

    mousePosition(mouseX, mouseY){
        const distance = this.distanceMoved(mouseX, mouseY)
        this.mouseX = mouseX;
        this.mouseY = mouseY;
        return distance;
    }

    distanceMoved(newMouseX, newMouseY){
        return { 
            X: newMouseX-this.mouseX,
            Y: newMouseY-this.mouseY  
        }
    }
}

let movingCamera = false; 

const mouse = new Mouse(0, 0)

const toRadius = (value) => value/360

const dragcamerastart = (e) => {
    if(!movingCamera) {
        mouse.mousePosition(e.clientX, e.clientY)
        document.addEventListener("mousemove", dragCamera)
        movingCamera = true
    }
}

const dragcamerastop = (e) => {
    if(movingCamera) {
        movingCamera = false;
        document.removeEventListener("mousemove", dragCamera)
        mouse.mousePosition(e.clientX, e.clientY)
    }
}

const dragCamera = (e) => {
    const diference = mouse.mousePosition(e.clientX, e.clientY)
    circleMesh.rotation.x += toRadius(diference.Y);
    circleMesh.rotation.z += toRadius(diference.X);
    renderer.render( scene, camera );
}

document.addEventListener("mousedown", dragcamerastart)
document.addEventListener("mouseup", dragcamerastop)
document.addEventListener("mouseout", dragcamerastop)
