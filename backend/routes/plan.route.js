import express from 'express'
import { getPlan } from '../controllers/plan.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/getplan', protectRoute, getPlan)

export default router
