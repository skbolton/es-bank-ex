import { attributes } from 'structure'

class FundsWithdrawn {
  static toString() {
    return 'acme-bank/funds-withdrawn'
  }

  toString() {
    return FundsWithdrawn.toString()
  }
}

export default attributes({
  accountId: {
    type: String,
    guid: true,
    required: true
  },
  amount: {
    type: Number,
    min: 0,
    required: true
  }
})(FundsWithdrawn)
