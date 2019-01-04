import './env'

export default {
    ip: process.env.API_HOST || '127.0.0.1',
    port: process.env.API_PORT || '3000'
}
