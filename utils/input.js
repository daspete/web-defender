import { Vector2, Vector3, Raycaster } from 'three'

class Input {
    constructor({ runtime }){
        this.runtime = runtime

        document.addEventListener('keydown', (e) => { this.OnKeyDown(e) })
        document.addEventListener('keyup', (e) => { this.OnKeyUp(e) })
        document.addEventListener('touchstart', (e) => { this.OnMouseDown(e) })
        document.addEventListener('touchend', (e) => { this.OnMouseUp(e) })
        document.addEventListener('mousedown', (e) => { this.OnMouseDown(e) })
        document.addEventListener('mouseup', (e) => { this.OnMouseUp(e) })
        document.addEventListener('mousemove', (e) => { this.OnMouseMove(e) })

        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            fire1: false,
            click: false,
            mouse: false,
            targetPosition: new Vector3()
        }

        this.mousePosition = new Vector2()

        this.raycaster = new Raycaster()
    }

    OnKeyDown(e){
        switch(e.code){
            case 'ArrowUp':
            case 'KeyW':
                this.keys.up = true
            break;
            case 'ArrowDown':
            case 'KeyS':
                this.keys.down = true
            break;

            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = true
            break;
            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = true
            break;
            case 'Space':
                this.keys.fire1 = true
            break;

        }

    }

    OnKeyUp(e){
        switch(e.code){
            case 'ArrowUp':
            case 'KeyW':
                this.keys.up = false
            break;
            case 'ArrowDown':
            case 'KeyS':
                this.keys.down = false
            break;

            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = false
            break;
            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = false
            break;
            case 'Space':
                this.keys.fire1 = false
            break;

        }

    }

    OnMouseDown(e){
        this.keys.click = true
    }

    OnMouseUp(e){
        this.keys.click = false
    }

    OnMouseMove(e){
        this.keys.mouse = {
            x: e.clientX,
            y: e.clientY
        }

        this.mousePosition = new Vector2(
            (e.clientX / renderer.width) * 2 - 1,
            -(e.clientY / renderer.height) * 2 + 1
        )

        this.raycaster.setFromCamera(this.mousePosition, renderer.camera.cam)

        let intersects = this.raycaster.intersectObjects([this.runtime.level.Floor])
        if(intersects.length > 0){
            this.keys.targetPosition = intersects[0].point
        }else{
            this.keys.targetPosition = false
        }
    }
}

export default Input
