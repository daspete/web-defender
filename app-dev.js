import TaskRunner from './services/taskrunner'

const App = async () => {
    let taskRunner = new TaskRunner()

    let api = await taskRunner.Start({
        name: 'app-api--dev',
        script: 'yarn dev:api'
    })

    let frontend = await taskRunner.Start({
        name: 'app-client--dev',
        script: 'yarn dev:client',
    })

    taskRunner.Disconnect()
}

App()
