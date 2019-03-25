import { createContainer, asValue, asFunction, Lifetime } from 'awilix'
import env from './infra/env'
import messageStore from './infra/messageStore'
import logger from './infra/logger'

const configureContainer = () => {
  const container = createContainer()

  container.register({
    env: asValue(env),
    messageStore: asFunction(messageStore, { lifetime: Lifetime.SINGLETON }),
    logger: asFunction(logger)
  })

  // have awilix automatically load and require modules
  container.loadModules(
    [
      // load all handlers
      './src/acme_bank/**/handlers/*.js',
      // load repositories
      './src/infra/repositories/*.js'
    ],
    {
      resolverOptions: { lifetime: Lifetime.SCOPED },
      formatName: 'camelCase'
    }
  )

  return container
}

export default configureContainer
