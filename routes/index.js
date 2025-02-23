import {Router} from 'express'
import userRouts from './userRoutes.js'
import postRoutes from './postRoutes.js'
import commentRoutes from './commentRoute.js'

const router = Router()
router.use('/api/user',userRouts)
router.use('/api/post',postRoutes)
router.use('/api/comment',commentRoutes)
export default router;