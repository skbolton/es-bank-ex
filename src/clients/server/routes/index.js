import { Router } from 'express'
import ledgerRouter from './ledger'

const router = Router()

router.use('/ledger', ledgerRouter)

export default router
