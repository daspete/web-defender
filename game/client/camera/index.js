import { PerspectiveCamera } from 'three'

class Camera {

    constructor({
        fov = 75,
        aspect = 16 / 9,
        near = 0.1,
        far = 1000
    } = {}){
        this.fov = fov
        this.aspect = aspect
        this.near = near
        this.far = far

        this.cam = new PerspectiveCamera(fov, aspect, near, far)
    }

    SetAspect(aspect){
        this.aspect = aspect

        this.cam.aspect = aspect
        this.cam.updateProjectionMatrix()
    }

}

export default Camera
