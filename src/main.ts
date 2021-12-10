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
scene.background = new THREE.Color( 0x181818 )

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
const rockNormalMap = textureLoader.load('../static/textures/rockNormalMap.jpg')
const golfballNormalMap = textureLoader.load('../static/textures/golfballNormalMap.jpg')
const rockyNormalMap = textureLoader.load('../static/textures/rockyNormalMap.jpg')

golfballNormalMap.wrapS = THREE.RepeatWrapping;
golfballNormalMap.wrapT = THREE.RepeatWrapping;

const normalMap = [rockyNormalMap, golfballNormalMap, rockNormalMap, organicNormal, splashNormal, faceNormal, metalNormal, patternNormal, circlePatNormal]

// Objects
const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64)

// Material
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x292929,
  metalness: 0.7,
  roughness: 0.2,
  normalMap: normalMap[0],
 })

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial) 
scene.add(sphere)

/**
 * Lights
 */

const pointLight = new THREE.PointLight(0x0000ff, 1)
pointLight.position.set(6, -3, -3)
scene.add(pointLight)
gui.add(pointLight.position, 'x').min(-3).max(6).step(0.01)
gui.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)


const pointLight2 = new THREE.PointLight(0xff0000, 1)
pointLight2.position.set(-3, 3, -3)
scene.add(pointLight2)
// gui.add(pointLight2.position, 'x').min(-3).max(6).step(0.01)
// gui.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// gui.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {

  // Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Animate sphere
  sphere.rotation.y = elapsedTime * 0.5

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)


  window.requestAnimationFrame(tick)
}

tick()



