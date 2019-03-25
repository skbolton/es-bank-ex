import { attributes } from 'structure'

class FundsDeposited {
  static toString() {
    return 'acme-bank/funds-deposited'
  }

  toString() {
    return FundsDeposited.toString()
  }
}

export default attributes({
  amount: {
    type: Number,
    min: 0,
    required: true
  },
  accountId: {
    type: String,
    guid: true,
    required: true
  }
})(FundsDeposited)
