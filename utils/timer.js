class Timer {
    constructor(){
        this.startTime = this.GetTime()
        this.lastTime = this.startTime
    }

    get StartTime(){
        return this.startTime
    }

    get Time(){
        this.lastTime = this.GetTime()

        return this.lastTime
    }

    GetTime(){
        if(typeof performance !== 'undefined'){
            return performance.now()
        }else{
            return new Date().getTime()
        }
    }
}

export default new Timer()
