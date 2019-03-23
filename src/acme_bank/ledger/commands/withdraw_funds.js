import struct from '../../struct'

const commandName = 'transact/withdraw-funds'

const WithdrawFunds = struct(
  {
    // validate name in case caller tries to pass in
    command: struct.literal(commandName),
    accountId: 'uuid',
    amount: 'positiveNumber'
  },
  {
    // set default values
    command: commandName
  }
)

WithdrawFunds.commandName = commandName

export default WithdrawFunds
