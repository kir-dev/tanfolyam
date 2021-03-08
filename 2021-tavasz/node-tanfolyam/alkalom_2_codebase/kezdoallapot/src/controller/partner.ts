import express from 'express'
import { authRequiredMW } from '../middleware/auth'
import { renderMW } from '../middleware/base'
import { partnerListMW } from '../middleware/partner'

const router = express.Router()

router.get('/',
  authRequiredMW,
  partnerListMW,
  renderMW('partners')
)

export default router