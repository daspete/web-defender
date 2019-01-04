import { Router } from 'express'
const router = new Router()

router.get('/', (req, res, next) => {
    res.json('aloha2')
})

export default router
