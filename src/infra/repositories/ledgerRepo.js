import EvenTideEvent from '../eventide_event'
import LedgerProjection from '../projections/ledger'

const createLedgerRepo = ({ messageStore, logger, stream }) => {
  /**
   * Project the stream of events and build up a ledger for
   * the given accountId
   *
   */
  const getForAccount = async accountId => {
    const entityStream = `${stream}-${accountId}`
    console.log(entityStream)
    const ledger = await messageStore.fetch(entityStream, LedgerProjection)
    // handle when the account doesn't actually exist
    if (!ledger.id) {
      return null
    }
    // validate the correct shape
    return ledger
  }

  /**
   * Take a domain event and add in any extra fields and defaults
   * that are needed for the EvenTide schea of event sourcing.
   * Then add that event to the stream we are in
   *
   */
  const apply = async domainEvent => {
    // TODO: find how to pass correlationId, causationId, and userId here
    logger.info({
      message: 'validating eventide event',
      event: domainEvent.toJSON()
    })
    const event = new EvenTideEvent({
      type: domainEvent.toString(),
      metadata: {}
    }).toJSON()

    event.data = domainEvent.toJSON()

    logger.info({ message: 'event tide event', event })

    const entityStream = `${stream}-${domainEvent.accountId}`
    console.log(entityStream)
    await messageStore.write(entityStream, event)
    return messageStore.fetch(entityStream, LedgerProjection)
  }

  return {
    getForAccount,
    apply
  }
}

export default createLedgerRepo
