import { attributes } from 'structure'
import uuidV4 from 'uuid/v4'

class AccountOpened {
  static toString() {
    return 'acme-bank/account-opened'
  }

  toString() {
    return AccountOpened.toString()
  }
}

export default attributes({
  accountId: {
    type: String,
    guid: true,
    default: () => uuidV4()
  }
})(AccountOpened)
