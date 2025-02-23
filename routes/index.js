import {Router} from 'express'
import userRouts from './userRoutes.js'

const router = Router()
router.use('/api/user',userRouts)
export default router;