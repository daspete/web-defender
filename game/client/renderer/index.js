import { Scene, WebGLRenderer, PCFShadowMap, Vector3 } from 'three'

import Camera from '~game/client/camera'

class Renderer {

    constructor({
        $container = null,
        width = 1280,
        height = 720,
    } = {}){
        this.$container = $container
        this.width = width
        this.height = height

        this.scene = new Scene()
        this.camera = new Camera({
            aspect: width / height
        })
        this.renderer = new WebGLRenderer({ antialias: true })
        this.renderer.setSize(width, height)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = PCFShadowMap

        this.$container.appendChild(this.renderer.domElement)

        this.entities = []

        this.SetupCamera()

        window.renderer = this
    }

    SetupCamera(){
        this.camera.cam.position.z = 25
        this.camera.cam.position.y = 40
        this.camera.cam.lookAt(new Vector3())
    }

    Update(){
        this.renderer.render(this.scene, this.camera.cam)
    }

    Resize({ width, height }){
        this.width = width
        this.height = height

        this.renderer.setSize(width, height)
        this.camera.SetAspect(width / height)
    }

}

export default Renderer
