import { Vector3 } from 'three'
import faker from 'faker'

import State from './states'

import Random from '~utils/random'
import Timer from '~utils/timer'

class Creep {
    constructor({
        name,
        color,
        player,
        otherPlayer,
        server,
        socketId,
        socket,
        stats = {
            energy: 8,
            speed: 0.2,
            damage: 1,
            attackRadius: 2,
            attackTime: 1200
        }
    }){
        this.name = name
        this.color = color
        this.server = server
        this.socketId = socketId
        this.socket = socket
        this.player = player
        this.otherPlayer = otherPlayer

        this.name = faker.name.findName()
        this.isDead = false

        this.stats = stats
        this.state = State.HUNT

        this.position = new Vector3(
            Random.Range(-10, -7),
            0,
            Random.Range(-10, -6)
        )

        this.lastAttackTime = Timer.Time
    }

    get ClientData(){
        return {
            id: this.id,
            name: this.name,
            color: this.color,
            stats: this.stats,
            position: this.position,
            otherSocketId: this.otherPlayer.socketId,
            socketId: this.player.socketId,
            isDead: this.isDead
        }
    }

    Update(){
        if(this.isDead) return

        switch(this.state){
            case State.HUNT:
                this.Move()
                this.GetAttackTarget()
            break;
            case State.ATTACK:
                this.Attack()
                this.GetAttackTarget()
            break;
        }
    }

    SetState(state){
        this.state = state
    }

    Move(){
        let targetPosition = new Vector3()
        targetPosition.subVectors(this.player.hero.position, this.position).normalize()
        targetPosition.add(this.position)
        this.position.lerp(targetPosition, this.stats.speed)
    }

    Attack(){
        if(Timer.Time > this.lastAttackTime + this.stats.attackTime){
            this.lastAttackTime = Timer.Time

            this.player.hero.GetDamage(this.stats.damage)
        }
    }

    GetAttackTarget(){
        if(this.position.distanceTo(this.player.hero.position) <= this.stats.attackRadius){
            this.state = State.ATTACK
        }else{
            this.state = State.HUNT
        }
    }

    GetDamage(damage){
        if(this.isDead == true) return

        this.stats.energy = Math.max(0, this.stats.energy - damage)

        if(this.stats.energy == 0){
            this.Die()
        }
    }

    Die(){
        this.isDead = true
        this.player.hero.OnTargetCreepKilled(this)
    }
}

export default Creep
