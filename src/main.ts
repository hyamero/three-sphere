import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'

/**
 * Base
 */

// Debug
const gui = new GUI()
gui.destroy()

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
// first light
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(-1.86, 1, -1.65)

// scene.add(pointLight)

// gui.add(pointLight.position, 'x').min(-3).max(6).step(0.01)
// gui.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
// gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
// gui.add(pointLight, 'intensity').min(0).max(10).step(0.5)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

// second light
const pointLight2 = new THREE.PointLight(0xff0000, 1)
pointLight2.position.set(-3, 2.5, -3)

scene.add(pointLight2)

const light1 = gui.addFolder('Light 1')

light1.add(pointLight2.position, 'x').min(-3).max(6).step(0.01)
light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.5)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2)
// scene.add(pointLightHelper2)

// third light
const pointLight3 = new THREE.PointLight(0x00ffff, 4)
pointLight3.position.set(4, -2.5, -3)

scene.add(pointLight3)

const light2 = gui.addFolder('Light 2')

light2.add(pointLight3.position, 'x').min(-3).max(6).step(0.01)
light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.5)

// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3)
// scene.add(pointLightHelper3)


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
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const cursor = {
  x: 0,
  y: 0
}

document.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / window.innerWidth - 0.5
  cursor.y = (e.clientY / window.innerHeight) - 0.5
})

window.addEventListener('scroll', (e) => {
  sphere.position.y = window.scrollY * 0.001
})

const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Animate sphere
  sphere.rotation.y = elapsedTime * 0.5

  sphere.rotation.y += ( cursor.x - sphere.rotation.y) * 0.5
  sphere.rotation.x += ( cursor.y - sphere.rotation.x) * 0.05
  sphere.position.z += -( cursor.y - sphere.rotation.x) * 0.05

  // Update controls
  // controls.update()

  // Render
  renderer.render(scene, camera)


  window.requestAnimationFrame(tick)
}

tick()



