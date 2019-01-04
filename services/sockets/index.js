import ServerSockets from '~game/server/sockets'

export default (server) => {
    const io = require('socket.io')(server)

    new ServerSockets(io)

    return io
}
