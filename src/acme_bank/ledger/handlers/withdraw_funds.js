import WithdrawFunds from '../commands/withdraw_funds'
import FundsWithdrawn from '../events/funds_withdrawn'
import UnknownAccountError from '../errors/unknown_account'
import InsufficientFundsError from '../errors/insufficient_funds'
import FrozenAccountError from '../errors/frozen_account'

/**
 * Creates handler for requests to withdraw funds for an account
 *
 * When processing withdraws the following must be verified
 * 1. Command structure is valid
 * 2. Ledger exists for account
 * 3. Account is not frozen
 * 4. amount of withdrawl would not cause balance to go below 0
 */
const createWithdrawHandler = ({ ledgerRepo }) => async command => {
  // 1.
  const withdrawFunds = new WithdrawFunds(command)
  const { errors: commandErrors } = withdrawFunds.validate()
  if (commandErrors.length) {
    throw new Error('validation stuff')
  }
  // 2.
  const { accountId, amount } = withdrawFunds
  const ledger = ledgerRepo.getForAccount(accountId)
  if (!ledger) {
    throw new UnknownAccountError({ accountId })
  }

  // 3.
  if (ledger.isFrozen) {
    throw new FrozenAccountError({
      accountId,
      frozenSince: ledger.frozenSince
    })
  }

  // 4.
  if (ledger.sufficientFunds(amount)) {
    return ledgerRepo.apply(new FundsWithdrawn({ accountId, amount }))
  }

  // insufficent funds
  throw new InsufficientFundsError({
    accountId,
    amount,
    balance: ledger.balance
  })
}

export default createWithdrawHandler
