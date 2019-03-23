import struct from '../struct'

const Ledger = struct(
  {
    isFrozen: 'boolean',
    frozenSince: 'datestr',
    accountId: 'uuid',
    balance: 'positiveNumber'
  },
  // defaults
  {
    isFrozen: false,
    frozenSince: null
  }
)

export default Ledger
