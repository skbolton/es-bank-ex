import OpenAccount from '../commands/open_account'
import AccountOpened from '../events/account_opened'

/**
 * Creates a handler for requests to withdraw funds for an account
 *
 */
const createAccountOpenHandler = ({ ledgerRepo, logger }) => async command => {
  logger.info({ message: 'validating command: [open account]', command })

  const openAccount = new OpenAccount(command)
  const { valid: validCommand } = openAccount.validate()

  if (!validCommand) {
    // TODO: handle potential array of validation errors here
    throw new Error('Whoops')
  }

  logger.info({
    message: 'command [open account] is valid',
    command: openAccount.toJSON()
  })

  logger.info('creating event: [account opened]')

  const accountOpened = new AccountOpened({})
  const { valid: validEvent } = accountOpened.validate()

  if (!validEvent) {
    logger.error({
      message: 'error creating event: [account opened]',
      error: e
    })
    throw new Error('yikes validation right')
  }

  logger.info({
    message: 'applying event: [account opened]',
    event: accountOpened.toJSON()
  })

  return ledgerRepo.apply(accountOpened)
}

export default createAccountOpenHandler
