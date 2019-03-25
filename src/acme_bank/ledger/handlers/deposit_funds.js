import DepositFunds from '../commands/deposit_funds'
import FundsDeposited from '../events/funds_deposited'
import UnknownAccountError from '../errors/unknown_account'
import FrozenAccountError from '../errors/frozen_account'

/**
 * creates a handler for requests to depost funds
 *
 * When processing deposits the following must be verified
 * 1. Command structure is valid
 * 2. Ledger exists for account
 * 3. Account is not frozen
 */
const createDepositHandler = ({ ledgerRepo }) => async command => {
  // 1.
  const depositFunds = new DepositFunds(command)
  const validation = depositFunds.validate()
  if (!validation.valid) {
    console.log(validation.errors)
    // TODO: add validation errors
    throw new Error(
      'Come back and find a way to consume a potential array of errors here'
    )
  }
  const { accountId, amount } = depositFunds
  // 2.
  const ledger = ledgerRepo.getForAccount(accountId)
  if (!ledger) {
    throw new UnknownAccountError({ accountId })
  }

  // 3.
  if (ledger.isFrozen) {
    throw new FrozenAccountError({ accountId, frozenSince: ledger.frozenSince })
  }

  // looks good lets take their money!
  return ledgerRepo.apply(new FundsDeposited({ accountId, amount }))
}

export default createDepositHandler
