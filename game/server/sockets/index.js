import GameRuntime from '~game/server/runtime'
import Player from '~game/server/entities/player'

class GameServer {
    constructor(io){
        this.io = io

        this.gameRuntime = new GameRuntime({
            server: this
        })

        this.gameRuntime.Start()

        this.io.on('connection', (socket) => {
            console.log('user connect', socket.id)

            socket.on('player.connect', (data) => {
                socket.player = new Player({
                    socketId: socket.id,
                    socket: socket,
                    server: this
                })

                socket.emit('player.connected', {
                    player: socket.player.ClientData,
                    players: this.GetClientPlayers()
                })

                socket.broadcast.emit('players.get', { players: this.GetClientPlayers() })

                socket.on('disconnect', () => {
                    this.io.emit('player.disconnected', { players: this.GetClientPlayers() })
                })
            })
        })
    }

    GetClientPlayers(){
        let players = []

        Object.keys(this.io.sockets.connected).forEach((socketId) => {
            let player = this.io.sockets.connected[socketId].player
            if(player) players.push(player.ClientData)
        })

        return players
    }

    GetServerPlayers(){
        let players = []

        Object.keys(this.io.sockets.connected).forEach((socketId) => {
            let player = this.io.sockets.connected[socketId].player
            if(player) players.push(player)
        })

        return players
    }

    GetOtherServerPlayers(playerSocketId){
        let players = []

        Object.keys(this.io.sockets.connected).forEach((socketId) => {
            let player = this.io.sockets.connected[socketId].player
            if(player && player.socketId != playerSocketId) players.push(player)
        })

        return players
    }
}

export default GameServer
