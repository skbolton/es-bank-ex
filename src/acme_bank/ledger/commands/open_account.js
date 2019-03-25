import { attributes } from 'structure'

class OpenAccount {
  static toString() {
    return 'acme-bank/open-account'
  }

  toString() {
    return OpenAccount.toString()
  }
}

export default attributes({})(OpenAccount)
