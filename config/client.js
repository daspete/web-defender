require('dotenv').config()
const path = require('path')

module.exports = {
    globalName: 'defender',

    server: {
        port: process.env.FRONTEND_PORT || '3002',
        host: process.env.FRONTEND_HOST || '127.0.0.1'
    },

    env: {
        ADMIN_URL: process.env.ADMIN_URL,
        FRONTEND_URL: process.env.FRONTEND_URL,
        SOCKET_URL: process.env.SOCKET_URL
    },

    srcDir: 'game/client',
    modulesDir: ['./node_modules'],
    buildDir: 'build/frontend',

    build: {
        extractCSS: true,

        extend(config){
            let rootDir = process.cwd()

            config.resolve.alias['~app'] = rootDir
            config.resolve.alias['~config'] = path.join(rootDir, 'config')
            config.resolve.alias['~entities'] = path.join(rootDir, 'game', 'entities')
            config.resolve.alias['~utils'] = path.join(rootDir, 'utils')
            config.resolve.alias['~game'] = path.join(rootDir, 'game')
        }
    },

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
    ],

    plugins: [
        { ssr: false, src: '~plugins/socket.io.js' }
    ],

    styleResources: {
        scss: [
            '~assets/scss/app.scss',
        ]
    },
}
