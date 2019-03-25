import awilix from 'awilix'
import configureContainer from './configureContainer'
import createServerModule from './clients/server/server'

const DIContainer = configureContainer()

const server = createServerModule(DIContainer)

Promise.resolve(server.start())
  .then(() => console.log('all things started'))
  .catch(console.error)
