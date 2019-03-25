import struct from '../../struct'

const commandName = 'transact/deposit-funds'

const DepositFunds = struct(
  {
    // validate name in case caller tries to pass it in
    type: struct.literal(commandName),
    accountId: 'uuid',
    amount: 'positiveNumber'
  },
  {
    // set default values
    type: commandName
  }
)

DepositFunds.toString = () => commandName

export default DepositFunds
