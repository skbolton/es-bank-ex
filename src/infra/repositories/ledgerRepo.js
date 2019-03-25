import EvenTideEvent from '../eventide_event'
import LedgerProjection from '../projections/ledger'
import Ledger from '../../acme_bank/ledger/ledger'

const createLedgerRepo = ({ messageStore, logger, stream }) => {
  /**
   * Project the stream of events and build up a ledger for
   * the given accountId
   *
   */
  const getForAccount = async accountId => {
    const ledger = await messageStore.fetch(stream, LedgerProjection)
    // handle when the account doesn't actually exist
    if (!ledger.id) {
      return null
    }
    // validate the correct shape
    return Ledger(ledger)
  }

  /**
   * Take a domain event and add in any extra fields and defaults
   * that are needed for the EvenTide schea of event sourcing.
   * Then add that event to the stream we are in
   *
   */
  const apply = async domainEvent => {
    logger.info('validating eventide event')
    const event = EvenTideEvent(domainEvent)

    await messageStore.write(stream, event)
    return messageStore.fetch(stream, LedgerProjection)
  }

  return {
    getForAccount,
    apply
  }
}

export default createLedgerRepo
