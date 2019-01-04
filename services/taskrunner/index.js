import pm2 from 'pm2'

class TaskRunner {
    constructor(){}

    async List(){
        return new Promise((resolve, reject) => {
            pm2.list(function(err, apps){
                if(err) reject(err)
                else resolve(apps)
            })
        })
    }

    async Start(app){
        return new Promise((resolve, reject) => {
            pm2.start(app, (err, apps) => {
                if(err) reject(err)
                else resolve()
            })
        })
    }

    async Stop(appName){
        let app = await this.Find(appName)

        return new Promise((resolve, reject) => {
            if(app){
                pm2.delete(appName, function(err){
                    if(err) reject(err)
                    else resolve()
                })
            }else{
                resolve()
            }
        })
    }

    async Find(appName){
        let apps = await this.List()

        return new Promise((resolve, reject) => {
            let app = apps.find((_app) => {
                return _app.name == appName
            })

            resolve(app)
        })
    }

    Disconnect(){
        pm2.disconnect()
    }
}

export default TaskRunner
