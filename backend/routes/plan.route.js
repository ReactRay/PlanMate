// src/routes/auth.route.js
import express from 'express'

import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router() // 🔄 use Router() instead of express()

router.post('/getplan', getPlan)

export default router
