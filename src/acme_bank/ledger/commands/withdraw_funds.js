import struct from '../../struct'

const commandName = 'transact/withdraw-funds'
const WithdrawFunds = struct(
  {
    // validate name in case caller tries to pass in
    type: struct.literal(commandName),
    accountId: 'uuid',
    amount: 'positiveNumber'
  },
  {
    // set default values
    type: commandName
  }
)

WithdrawFunds.toString = () => commandName

export default WithdrawFunds
