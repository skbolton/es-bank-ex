class UnknownAccountError extends Error {
  constructor ({ accountId }) {
    super()
    this.name = 'UnknownAccountError'
    this.message = 'Unknown account'
    this.details = { accountId }
    // give a better error stack trace
    Error.captureStackTrace(this, UnknownAccountError)
  }
}

export default UnknownAccountError
