import OpenAccount from '../commands/open_account'
import AccountOpened from '../events/account_opened'

/**
 * Creates a handler for requests to withdraw funds for an account
 *
 */
const createAccountOpenHandler = ({ ledgerRepo, logger }) => async command => {
  logger.info({ message: 'validating command: [open account]', command })

  const openAccount = OpenAccount(command)

  logger.info({
    message: 'command [open account] is valid',
    command: openAccount
  })

  logger.info('creating event: [account opened]')

  try {
    const event = AccountOpened({})

    logger.info({ message: 'applying event: [account opened]', event })

    return ledgerRepo.apply(event)
  } catch (e) {
    logger.error({
      message: 'error creating event: [account opened]',
      error: e
    })

    throw e
  }
}

export default createAccountOpenHandler
