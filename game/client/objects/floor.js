import { Vector3, PlaneBufferGeometry, MeshPhongMaterial, MeshBasicMaterial, Mesh } from 'three'

class Floor {
    constructor({
        position = { x: 0, y: 0, z: 0 },
        dimension = { width: 1, depth: 1 },
        color = 0xffcc00,
    }){
        this.position = position
        this.dimension = dimension
        this.color = color

        this.geometry = new PlaneBufferGeometry(dimension.width, dimension.depth)
        this.geometry.rotateX(-Math.PI * 0.5)

        this.material = new MeshBasicMaterial({
            color: this.color
        })

        this.object = new Mesh(this.geometry, this.material)
        this.object.position.set(position.x, position.y, position.z)
        renderer.scene.add(this.object)
    }
}

export default Floor
