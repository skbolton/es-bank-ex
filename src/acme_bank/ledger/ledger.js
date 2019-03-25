import { attributes } from 'structure'

class Ledger {
  deposit(amount) {
    this.balance += amount

    return this
  }

  withdraw(amount) {
    this.balance -= amount

    return this
  }

  freeze() {
    this.isFrozen = true
    this.frozenSince = Date.now()

    return this
  }

  sufficientFunds(amount = 0) {
    return this.balance - amount >= 0
  }
}

export default attributes({
  id: {
    type: String,
    guid: true,
    required: true
  },
  isFrozen: {
    type: Boolean,
    default: false
  },
  frozenSince: {
    type: Number,
    positive: true
  },
  balance: {
    type: Number,
    default: 0,
    min: 0
  }
})(Ledger)
