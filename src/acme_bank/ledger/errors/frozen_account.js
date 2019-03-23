class FrozenAccountError extends Error {
  constructor ({ accountId, frozenSince }) {
    super()
    this.message = 'Frozen account'
    this.data = {
      accountId,
      frozenSince: frozenSince
    }

    Error.captureStackTrace(this, FrozenAccountError)
  }
}

export default FrozenAccountError
