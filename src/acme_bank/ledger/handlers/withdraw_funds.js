import Ledger from '../ledger'
import WithdrawFunds from '../commands/withdraw_funds'
import FundsWithdrawn from '../events/funds_withdrawn'
import UnknownAccountError from '../errors/unknown_account'
import OverdrawnError from '../errors/overdrawn'
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
  const withdrawFunds = WithdrawFunds(command)
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
  try {
    Ledger({
      ...ledger,
      balance: ledger.balance - amount
    })
  } catch (e) {
    throw new OverdrawnError({ accountId, amount, balance: ledger.balance })
  }

  // ledger is valid apply change
  return ledgerRepo.apply(FundsWithdrawn({ data: { accountId, amount } }))
}

export default createWithdrawHandler
