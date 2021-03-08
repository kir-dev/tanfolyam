import express from 'express'
import { authRequiredMW } from '../middleware/auth'
import { renderMW } from '../middleware/base'

const router = express.Router()

router.get('/',
  authRequiredMW,
  renderMW('dashboard/index')
)


router.get('/login',
  renderMW('error/forbidden')
)

export default router