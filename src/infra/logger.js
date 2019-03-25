import winston from 'winston'

/**
 * Creates a logger with all necessary metadata data attached to
 * messages
 */
const createLogger = ({ env, correlationId, userId }) => {
  return winston.createLogger({
    defaultMeta: { service: 'acme-bank', correlationId, userId },
    level: env.logLevel,
    transports: [new winston.transports.Console()]
  })
}

export default createLogger
