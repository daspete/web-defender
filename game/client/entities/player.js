import Hero from './hero'
import Creep from './creep';

class Player {
    constructor({
        name,
        hero
    }){
        this.name = name
        this.hero = new Hero(hero)
        this.creeps = []
    }

    UpdateData({
        name,
        hero,
        creeps
    }){
        this.hero.UpdateData(hero)

        this.UpdateCreepData(creeps)
    }

    Update(deltaTime){
        this.hero.Update(deltaTime)

        this.creeps.forEach((creep) => {
            creep.Update(deltaTime)
        })
    }

    UpdateCreepData(creeps){
        let activeCreepIds = []

        creeps.forEach((creepData) => {
            let creep = this.creeps.find((_creep) => {
                return _creep.id == creepData.id
            })

            if(creep == undefined){
                creep = new Creep(creepData)
                this.creeps.push(creep)
            }else{
                creep.UpdateData(creepData)
            }

            activeCreepIds.push(creep.id)
        })

        this.creeps.forEach((creep) => {
            if(creep.isDead == false && !activeCreepIds.includes(creep.id)){
                creep.Die()
            }
        })
    }
}

export default Player
