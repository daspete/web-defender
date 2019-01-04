import Cube from '~game/client/objects/cube'

class Creep {
    constructor({
        id,
        name,
        color,
        stats,
        position,
        socketId,
        isDead
    }){
        this.id = id
        this.name = name
        this.color = color
        this.stats = stats
        this.position = position
        this.socketId = socketId
        this.isDead = isDead

        this.model = new Cube({
            position: this.position,
            color: this.color
        })
    }

    UpdateData({
        id,
        name,
        stats,
        position,
        socketId,
        isDead
    }){
        this.id = id
        this.name = name
        this.stats = stats
        this.position = position
        this.socketId = socketId
        this.isDead = isDead

        if(this.isDead) return

        this.model.SetTargetPosition(this.position)
    }

    Update(){
        if(this.isDead) return

        this.model.Update(this.stats.speed * 0.25)
    }

    Die(){
        this.isDead = true
        this.model.Destroy()
    }
}

export default Creep
