import Ledger from '../../acme_bank/ledger/ledger'
import AccountOpened from '../../acme_bank/ledger/events/account_opened'
import FundsDeposited from '../../acme_bank/ledger/events/funds_deposited'
import FundsWithdrawn from '../../acme_bank/ledger/events/funds_withdrawn'

const ledgerProjection = {
  $init: new Ledger(),
  [AccountOpened](state, event) {
    state.id = event.data.accountId
    return state
  },
  [FundsDeposited](state, event) {
    console.log('hi')
    return state.deposit(event.data.amount)
  },
  [FundsWithdrawn](state, event) {
    return state.withdraw(event.data.amount)
  }
}

export default ledgerProjection
