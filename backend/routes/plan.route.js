import express from 'express'
import { getPlan, resetPlan } from '../controllers/plan.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/getplan', protectRoute, getPlan)
router.delete('/reset', protectRoute, resetPlan)

export default router
