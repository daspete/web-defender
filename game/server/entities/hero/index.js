import { Vector3, Object3D } from 'three'

import State from './states'

import Timer from '~utils/timer'
import Random from '~utils/random'

class Hero {
    constructor({
        name,
        color,
        server,
        socketId,
        socket,
        player,
        stats = {
            energy: 100,
            speed: 0.3,
            damage: 10,
            attackRadius: 3,
            attackTime: 500,
            huntRadius: 5
        }
    }){
        this.server = server
        this.socketId = socketId
        this.socket = socket
        this.color = color
        this.name = name
        this.player = player

        this.state = State.WALK

        this.stats = stats

        this.input = {}

        this.position = new Vector3(
            Random.Range(-5, 5),
            0,
            Random.Range(-5, 5)
        )
        this.dummy = new Object3D()
        this.dummy.position.set(
            this.position.x,
            this.position.y,
            this.position.z
        )

        this.targetCreep = null

        this.lastAttackTime = Timer.Time

        this.kills = 0

        this.targetPosition = this.position.clone()
    }

    get ClientData(){
        return {
            name: this.name,
            color: this.color,
            stats: this.stats,
            position: this.position,
            targetCreepId: this.targetCreep ? this.targetCreep.id : false,
            kills: this.kills
        }
    }

    Update(){
        if(this.isDead) return

        switch(this.state){
            case State.IDLE:

            break;
            case State.WALK:
                this.Move()
                this.GetAttackTarget()
            break;
            case State.ATTACK:
                this.Attack()
                this.Move()
                this.GetAttackTarget()
            break;
            case State.HIT:

            break;
        }
    }

    SetState(state){
        this.state = state
    }

    Move(){
        if(this.input.targetPosition && this.input.click){
            this.targetPosition.set(
                this.input.targetPosition.x,
                this.input.targetPosition.y,
                this.input.targetPosition.z
            )
        }

        if(this.targetPosition && this.position.distanceTo(this.targetPosition) > 0.3){
            this.dummy.lookAt(this.targetPosition)
            this.dummy.translateZ(this.stats.speed)
            this.position.copy(this.dummy.position)
        }
    }

    Attack(){
        if(Timer.Time > this.lastAttackTime + this.stats.attackTime){
            this.lastAttackTime = Timer.Time

            if(this.targetCreep){
                this.targetCreep.GetDamage(this.stats.damage)
            }
        }
    }

    GetAttackTarget(){
        if(this.targetCreep) {
            this.SetState(State.ATTACK)
            return
        }

        this.player.creeps.forEach((creep) => {
            if(creep.isDead == false && this.position.distanceTo(creep.position) <= this.stats.attackRadius){
                this.targetCreep = creep
                this.SetState(State.ATTACK)
            }
        })

        if(this.targetCreep == false){
            this.state = State.WALK
        }
    }

    GetDamage(damage){
        this.stats.energy = Math.max(0, this.stats.energy - damage)
    }

    OnTargetCreepKilled(creep){
        this.targetCreep = false
        this.kills++;
        this.player.RemoveCreep(creep)
    }
}

export default Hero
