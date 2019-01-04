import { Vector3 } from 'three'
import Floor from '~game/client/objects/floor'

class TestLevel {
    constructor({ runtime, renderer }){
        this.runtime = runtime
        this.renderer = renderer

        this.floor = new Floor({
            color: 0xdedede,
            position: new Vector3(0, 0, 0),
            dimension: {
                width: 100,
                depth: 100
            }
        })
    }

    get Floor(){
        return this.floor.object
    }
}

export default TestLevel
