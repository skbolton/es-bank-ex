class OverdrawnError extends Error {
  constructor ({ accountId, balance, amount }) {
    super()
    this.message = 'Invalid transaction'
    this.data = {
      accountId,
      balance,
      amount,
      deniedResult: balance - amount
    }
    Error.captureStackTrace(this, OverdrawnError)
  }
}

export default OverdrawnError
