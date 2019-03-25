import AccountOpened from '../../acme_bank/ledger/events/account_opened'
import FundsDeposited from '../../acme_bank/ledger/events/funds_deposited'
import FundsWithdrawn from '../../acme_bank/ledger/events/funds_withdrawn'

const ledgerProjection = {
  $init() {
    return {
      id: null,
      isFrozen: null,
      frozenSince: null,
      balance: 0
    }
  },
  [AccountOpened](state, event) {
    return {
      ...state,
      id: event.data.accountId
    }
  },
  [FundsDeposited](state, event) {
    return {
      ...state,
      balance: state.balance + event.data.amount
    }
  },
  [FundsWithdrawn](state, event) {
    return {
      ...state,
      balance: state.balance - event.data.amount
    }
  }
}

export default ledgerProjection
