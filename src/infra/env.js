// helper module for dealing with environment stuff so that no one has to read from env

const { env } = process.env

export default {
  node: env.NODE_ENV
}
