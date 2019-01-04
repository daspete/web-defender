import Sleep from '~utils/sleep'
import Timer from '~utils/timer'

class GameRuntime {

    constructor({ server }){
        this.started = false
        this.server = server

        this.fpsNetwork = 1000 / 10
        this.fps = 1000 / 30
    }

    Start(){
        this.started = true

        this.Update()
        this.NetworkUpdate()
    }

    Stop(){
        this.started = false
    }

    async Update(){
        while(this.started){
            let time = Timer.Time

            this.server.GetServerPlayers().forEach((player) => {
                player.Update()
            })

            await Sleep(Math.floor(this.fps - (Timer.Time - time)))
        }
    }

    async NetworkUpdate(){
        while(this.started){
            let time = Timer.Time

            this.server.GetServerPlayers().forEach((player) => {
                player.socket.emit('players.update', { players: this.server.GetClientPlayers() })
            })

            await Sleep(Math.floor(this.fpsNetwork - (Timer.Time - time)))
        }
    }


}

export default GameRuntime
