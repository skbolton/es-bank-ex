import struct from '../../struct'

const commandName = 'transact/deposit-funds'

const DepositFunds = struct(
  {
    // validate name in case caller tries to pass it in
    command: struct.literal(commandName),
    accountId: 'uuid',
    amount: 'positiveNumber'
  },
  {
    // set default values
    command: commandName
  }
)

DepositFunds.commandName = commandName

export default DepositFunds
