
import Player from '~game/client/entities/player'
import Renderer from '~game/client/renderer'

import TestLevel from '~game/client/environments/testlevel'

import Timer from '~utils/timer'

class GameRuntime {
    constructor({
        $container,
        user,
        socket,
        width = 1280,
        height = 720,
        desiredFps = 1000 / 30
    }){
        this.user = user
        this.socket = socket
        this.players = []
        this.player = null
        this.width = width
        this.height = height
        this.desiredFps = desiredFps
        this.deltaTime = 0

        this.renderer = new Renderer({
            $container,
            width,
            height
        })

        this.level = new TestLevel({
            renderer: this.renderer,
            runtime: this
        })

        this.Update()
    }

    Update(){
        requestAnimationFrame(() =>{ this.Update() })

        let time = Timer.Time

        if(this.player != null){
            this.player.Update(this.deltaTime)
        }

        this.renderer.Update()

        this.deltaTime = (Timer.Time - time) / 1000
    }

    Resize({ width, height }){
        this.width = width;
        this.height = height;

        this.renderer.Resize({ width, height })
    }

    SetPlayers({ player, players }){
        if(this.player == null){
            this.player = new Player(player)
        }else{
            this.player.UpdateData(player)
        }

        // TODO:: draw minimap with other players
    }
}

export default GameRuntime
