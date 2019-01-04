import Cube from '~game/client/objects/cube'

class Hero {
    constructor({
        name,
        stats,
        position,
        color
    }){
        this.name = name
        this.stats = stats
        this.position = position
        this.color = color

        this.model = new Cube({
            color: this.color,
            position: this.position
        })
    }

    UpdateData({
        stats,
        position
    }){
        this.stats = stats
        this.position = position

        this.model.SetTargetPosition(this.position)
    }

    Update(deltaTime){
        this.model.Update(this.stats.speed, deltaTime)
    }
}

export default Hero
