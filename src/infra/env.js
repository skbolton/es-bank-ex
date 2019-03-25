// helper module for dealing with environment stuff so that no one has to read from env

const { env } = process

export default {
  node: env.NODE_ENV,
  port: env.PORT || 3000,
  dbUser: 'message_store',
  dbPassword: '',
  dbHost: 'localhost',
  logLevel: env.LOGLEVEL || 'info'
}
