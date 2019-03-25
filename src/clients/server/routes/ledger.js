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
    const account = await depositFunds(
      new DepositFunds({ amount, accountId }).toJSON()
    )
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
    const account = await openAccount(new OpenAccount({}))

    return res.json({ account: account.toJSON() })
  } catch (e) {
    console.log(e)
    logger.error(e)

    return res.json({ error: 'whoops' })
  }
})

ledgerRouter.get('/', async (req, res) => {
  const messageStore = req.scope.resolve('messageStore')

  const messages = await messageStore.getStreamMessages('accounts')

  return res.json({ messages })
})

export default ledgerRouter
