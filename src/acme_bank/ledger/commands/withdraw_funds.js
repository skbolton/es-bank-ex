import { attributes } from 'structure'

class WithdrawFunds {
  static toString() {
    return 'acme-bank/withdraw-funds'
  }

  toString() {
    return WithdrawFunds.toString()
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
})(WithdrawFunds)
