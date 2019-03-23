import uuidV4 from 'uuid/v4'
import struct from '../../struct'

const eventName = 'transact/funds-withdrawn'

const FundsWithdrawn = struct(
  {
    id: 'uuid',
    // by setting it this way we
    // make sure that if caller does pass event in
    // it checks it. Usually we will just default the name
    event: struct.literal(eventName),
    data: {
      accountId: 'uuid',
      amount: 'positiveNumber'
    }
  },
  {
    id: uuidV4,
    event: eventName
  }
)

FundsWithdrawn.eventName = eventName

export default FundsWithdrawn
