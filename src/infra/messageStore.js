import {
  buildConnectionString,
  createMessageStore as evenTideStore
} from '@berkadia/eventide-message-store-connector'

const createMessageStore = ({ env }) => {
  const { dbUser, dbPassword } = env
  const connectionString = buildConnectionString(
    dbUser,
    dbPassword,
    'localhost'
  )

  return evenTideStore({
    connectionString
  })
}

export default createMessageStore
