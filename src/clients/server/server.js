import express from 'express'
import { asValue } from 'awilix'
import uuidV4 from 'uuid/v4'
import apiRouter from './routes'

function createServerModule(DIContainer) {
  function start() {
    const app = express()
    const { port } = DIContainer.resolve('env')

    // GLOBAL MIDDLEWARE --------------------------------|

    /**
     * Middleware - body parser
     * This is what makes `req.body` exist for json request body's
     *
     * @returns {undefined}
     */
    app.use(express.json())

    /**
     * Middleware - setupDIScope
     * Responsible for setting up a scope in the DI container.
     * This is what allows the correlationId and userId to not get cached in
     * the main container but instead be created on every request (scope).
     *
     * @param req express request
     * @param res express response
     * @param next express next middleware
     * @returns {undefined}
     */
    const setupDIScope = (req, _res, next) => {
      req.scope = DIContainer.createScope()

      return next()
    }
    app.use(setupDIScope)

    /**
     * Middleware - addCorrelationAndUserIdToScope
     * Responsible for grabbing correlation and userId
     * from request and adding it to DI container scope so that
     * dependencies can read values in actions that happen after
     * this point.
     *
     * @param req express request
     * @param res express response
     * @param next express next middleware
     * @returns {undefined}
     */
    const addCorrelationAndUserIdToScope = (req, _res, next) => {
      const correlationId = req.headers['correlationId'] || uuidV4()
      const userId = req.headers['userId'] || uuidV4()
      // add values to the current scope
      req.scope.register({
        correlationId: asValue(correlationId),
        userId: asValue(correlationId)
      })

      return next()
    }
    app.use(addCorrelationAndUserIdToScope)

    // END GLOBAL MIDDLEWARE ----------------------------|

    app.use('/api', apiRouter)

    return app.listen(port, () =>
      console.log(`Server is running on port: ${port}`)
    )
  }

  return { start }
}

export default createServerModule
