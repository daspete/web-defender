import Vue from 'vue'
import io from 'socket.io-client'

const socket = io(process.env.SOCKET_URL)

Vue.use({
    install(Vue, options){
        Vue.prototype.$socket = socket
    }
})
