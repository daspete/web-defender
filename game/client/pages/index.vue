<template>
    <div class="app">
        <div class="game" ref="game"></div>
        <div class="ui">
            <div class="ui__stats" v-if="player && player.hero">
                <div class="kills">{{ player.hero.kills }}</div>
                <div class="stats">{{ player.hero.stats }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>

<script>
import GameRuntime from '~game/client/runtime'
import Input from '~utils/input'

export default {
    asyncData(){
        return {
            player: null,
            players: [],
            input: {
                keys: {}
            },
            runtime: null
        }
    },

    watch: {
        'input.keys': {
            deep: true,
            handler: function(value){
                this.$socket.emit('player.input', value)
            }
        },
    },

    beforeMount(){
        this.$socket.on('player.connected', ({ players }) => {
            this.UpdatePlayers(players)
        })

        this.$socket.on('player.disconnected', ({ players }) => {
            this.UpdatePlayers(players)
        })

        this.$socket.on('players.get', ({ players }) => {
            this.UpdatePlayers(players)
        })

        this.$socket.on('players.update', ({ players }) => {
            this.UpdatePlayers(players)
        })

        this.$socket.emit('player.connect')
    },

    mounted(){
        this.runtime = new GameRuntime({
            $container: this.$refs.game,
            socket: this.$socket,
            width: this.$refs.game.clientWidth,
            height: this.$refs.game.clientHeight
        })

        this.input = new Input({
            runtime: this.runtime
        })

        window.addEventListener('resize', (e) => { this.OnResize(e) })
    },

    methods: {
        UpdatePlayers(remotePlayers){
            let player = null
            let players = []

            remotePlayers.forEach((_player) => {
                if(_player.socketId == this.$socket.id){
                    player = _player
                }else{
                    players.push(_player)
                }
            })

            this.player = player
            this.players = players

            if(this.runtime == null) return
            this.runtime.SetPlayers({ player, players })
        },

        OnResize(e){
            this.runtime.Resize({
                width: this.$refs.game.clientWidth,
                height: this.$refs.game.clientHeight
            })
        }
    }
}
</script>
