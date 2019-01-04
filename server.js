import http from 'http'

import expressConfig from '~config/express'
import express from '~app/services/express'
import Sockets from '~app/services/sockets'

const app = express()
const server = http.createServer(app)
const sockets = Sockets(server)

server.listen(expressConfig.port, expressConfig.ip, () => {
    console.log(`Server is listening on ${ expressConfig.ip }:${ expressConfig.port }`)
})
