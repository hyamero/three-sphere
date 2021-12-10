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

/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader()
const organicNormal = textureLoader.load('../static/textures/SurfaceAppearance-NormalMap.jpg')
const splashNormal = textureLoader.load('../static/textures/TearSplashNormalMap.jpg')
const faceNormal = textureLoader.load('../static/textures/FaceNormalMap.jpg')
const metalNormal = textureLoader.load('../static/textures/metalNormal.jpg')
const patternNormal = textureLoader.load('../static/textures/PatternNormal.jpg')
const circlePatNormal = textureLoader.load('../static/textures/circlePatNormal.png')

const normalMap = [organicNormal, splashNormal, faceNormal, metalNormal, patternNormal, circlePatNormal]

// Objects
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64)

// Material
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalMap[1]
 })

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial) 
scene.add(sphere)

/**
 * Lights
 */

const redLight = new THREE.PointLight(0xff0000, 1, 5)
redLight.position.set(1, 0, 1)
scene.add(redLight)
gui.add(redLight.position, 'x').min(-3).max(3).step(0.01)

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



