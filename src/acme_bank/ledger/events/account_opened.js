import uuidV4 from 'uuid/v4'
import struct from '../../struct'

const eventName = 'transact/account-opened'

const AccountOpened = struct(
  {
    id: 'uuid',
    // validate in case caller does try to pass it in
    // we default if for caller so they don't have to
    type: struct.literal(eventName),
    data: struct(
      {
        accountId: 'uuid'
      },
      // defaults
      { accountId: () => uuidV4() }
    )
  },
  // defaults
  {
    id: () => uuidV4(),
    type: eventName,
    data: {}
  }
)

AccountOpened.toString = () => eventName

export default AccountOpened
