import { Router } from 'express'
import { asValue } from 'awilix'
import OpenAccount from '../../../acme_bank/ledger/commands/open_account'
import DepositFunds from '../../../acme_bank/ledger/commands/deposit_funds'

const ledgerRouter = Router()

ledgerRouter.post('/:accountId', async (req, res) => {
  const { amount } = req.body
  const { accountId } = req.params
  req.scope.register('stream', asValue('accounts'))
  const logger = req.scope.resolve('logger')
  logger.info(req.body)

  try {
    const depositFunds = req.scope.resolve('depositFunds')
    const account = await depositFunds(DepositFunds({ amount, accountId }))
    return res.json({ account })
  } catch (e) {
    logger.error(e.message)

    return res.json({ error: e })
  }
})

ledgerRouter.post('/', async (req, res) => {
  const logger = req.scope.resolve('logger')
  req.scope.register('stream', asValue('accounts'))
  logger.info(req.params)

  try {
    const openAccount = req.scope.resolve('openAccount')
    const account = await openAccount(OpenAccount({}))

    return res.json({ account })
  } catch (e) {
    logger.error(e.message)

    return res.json({ error: 'whoops' })
  }
})

export default ledgerRouter
