import { attributes } from 'structure'

class DepositFunds {
  static toString() {
    return 'acme-bank/deposit-funds'
  }

  toString() {
    return DepositFunds.toString()
  }
}

export default attributes({
  accountId: {
    type: String,
    required: true,
    guid: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
})(DepositFunds)
