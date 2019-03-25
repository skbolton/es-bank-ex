import { attributes } from 'structure'
import uuidV4 from 'uuid/v4'

const MetaData = attributes({
  correlationId: {
    type: String,
    guid: true,
    default: ''
  },
  causastionId: {
    type: String,
    guid: true,
    default: ''
  },
  userId: {
    type: String,
    guid: true,
    default: ''
  }
})(class EvenTideMetadata {})

class EvenTideEvent {
  toString() {
    return this.type
  }
}

export default attributes({
  id: {
    type: String,
    guid: true,
    default: () => uuidV4()
  },
  type: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: () => Date.now()
  },
  metadata: MetaData
})(EvenTideEvent)
