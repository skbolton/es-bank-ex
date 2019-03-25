import struct from '../../struct'
const commandName = 'transact/open-account'

const OpenAccount = struct(
  {
    type: struct.literal(commandName)
  },
  {
    type: commandName
  }
)

OpenAccount.toString = () => commandName

export default OpenAccount
