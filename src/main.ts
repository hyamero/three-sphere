import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'

/**
 * Base
 */

// Debug
const gui = new GUI()

// Canvas
const canvas: any = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene

// Objects
const sphereGeometry = new THREE.BoxBufferGeometry(1, 1, 1)

// Material
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial) 
scene.add(sphere)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)


  window.requestAnimationFrame(tick)
}

tick()



