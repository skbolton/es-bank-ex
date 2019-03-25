import struct from '../acme_bank/struct'
import uuidV4 from 'uuid/v4'

const EvenTideEvent = struct(
  {
    id: 'uuid',
    time: 'number',
    type: 'string',
    metadata: {
      // the causation is optional since the first command
      // won't have one
      causationId: 'uuid?',
      correlationId: 'uuid?',
      // this is also optional since not all events will
      // have a user as the one who caused it to happen
      userId: 'uuid?'
    },
    metadata: struct(
      {
        causationId: 'uuid?',
        correlationId: 'uuid?',
        userId: 'uuid?'
      },
      {
        causationId: () => uuidV4(),
        correlationId: () => uuidV4(),
        userId: () => uuidV4()
      }
    ),
    data: 'object'
  },
  // the defaults in case they aren't provided
  {
    id: () => uuidV4(),
    time: () => Date.now(),
    metadata: {}
  }
)

export default EvenTideEvent
