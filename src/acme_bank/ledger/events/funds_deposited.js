import uuidV4 from 'uuid/v4'
import struct from '../../struct'

const eventName = 'transact/funds-deposited'

const FundsDeposited = struct(
  {
    event: struct.literal(eventName),
    id: 'uuid',
    data: {
      amount: 'positiveNumber',
      accountId: 'uuid'
    }
  },
  // these are how we apply the defaults
  // to the event structure
  {
    id: uuidV4
  }
)

FundsDeposited.toString = () => eventName

export default FundsDeposited
