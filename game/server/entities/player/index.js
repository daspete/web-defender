import faker from 'faker'
import Hero from '~game/server/entities/hero'
import Creep from '~game/server/entities/creep'

class Player {
    constructor({ socketId, server, socket }){
        this.socketId = socketId
        this.server = server
        this.socket = socket
        this.name = faker.name.findName()
        this.color = faker.internet.color(128, 128, 70)

        this.hero = new Hero({
            name: faker.name.findName(),
            color: this.color,
            socketId,
            server,
            socket,
            player: this

        })

        this.creepId = 0
        this.creeps = []

        this.socket.on('player.input', ({ up, down, left, right, fire1, targetPosition, click }) => {
            this.hero.input = { up, down, left, right, fire1, targetPosition, click }

            if(fire1){
                this.SendCreep()
            }
        })
    }

    get ClientData(){
        let creeps = this.creeps.map((creep) => {
            return creep.ClientData
        })

        return {
            socketId: this.socketId,
            name: this.name,
            color: this.color,
            hero: this.hero.ClientData,
            creeps: creeps
        }
    }


    Update(){
        this.hero.Update()
        this.creeps.forEach((creep) => {
            creep.Update()
        })
    }

    SendCreep(){
        let otherPlayers = this.server.GetOtherServerPlayers(this.socketId)
        otherPlayers.forEach((otherPlayer) => {
            otherPlayer.AddCreep(new Creep({
                name: faker.name.findName(),
                color: this.color,
                otherPlayer: this,
                server: this.server,
                socket: this.socket,
                socketId: this.socketId
            }))
        })
    }

    AddCreep(creep){
        creep.id = this.creepId;
        creep.player = this

        this.creeps.push(creep)
        this.creepId++;
    }

    RemoveCreep(creep){
        this.creeps = this.creeps.filter((_creep) => {
            return _creep.id != creep.id
        })
    }

}

export default Player
