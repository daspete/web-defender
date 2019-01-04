require('dotenv').config()
const path = require('path')

module.exports = {
    webpack: (config, options, webpack) => {
        const rootPath = path.resolve(process.cwd())

        switch(process.env.BACKPACK_ENV){
            case 'api:dev':
                config.output.path = path.join(rootPath, 'build', 'server')
                config.entry.main = ['./server.js']
            break

            case 'app:dev':
                config.output.path = path.join(rootPath, 'build', 'dev')
                config.entry.main = ['./app-dev.js']
            break;
        }

        config.resolve = {
            alias: {
                '~app': rootPath,
                '~config': rootPath + '/config',
                '~api': rootPath + '/api',
                '~game': rootPath + '/game',
                '~entities': rootPath + '/game/entities',
                '~utils': rootPath + '/utils'
            }
        }

        return config
    }
}
