import { Vector3, BoxGeometry, MeshPhongMaterial, MeshBasicMaterial, Mesh } from 'three'

class Cube {
    constructor({
        position = { x: 0, y: 0, z: 0 },
        dimension = { width: 1, height: 1, depth: 1 },
        color = 0xffcc00,
        parent = null
    } = {}){
        this.position = position
        this.dimension = dimension
        this.color = color
        this.geometry = new BoxGeometry(dimension.width, dimension.height, dimension.depth)
        this.material = new MeshBasicMaterial({
            color: color
        })

        this.object = new Mesh(this.geometry, this.material)
        this.object.castShadow = true
        this.object.position.set(position.x, position.y, position.z)
        renderer.scene.add(this.object)
        this.targetPosition = new Vector3(position.x, position.y, position.z)
    }

    SetTargetPosition({ x = 0, y = 0, z = 0 }){
        this.targetPosition.set(x, y, z)
    }

    Update(speed, deltaTime){
        this.object.position.lerp(this.targetPosition, 0.1)
        this.object.lookAt(this.targetPosition)
    }

    Destroy(){
        renderer.scene.remove(this.object)
    }
}

export default Cube
