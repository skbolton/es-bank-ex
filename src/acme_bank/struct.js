import { superstruct } from 'superstruct'
import isUUID from 'is-uuid'

/**
 * Superstruct is a library for validating objects simliar to Joi.
 * It was chosen because of the more user friendly errors it produces
 * and the lightweight feel to its schema declarations
 *
 * Instead of using the default struct that superstruct exports
 * we extend and build our own that understands some custom types.
 * @example
 *   // using custom uuid type we inject below
 *   const User = struct({
 *     id: 'uuid'
 *   })
 *
 *  // throws error
 *  User({ id: 'not a valid uuid' })
 */
const struct = superstruct({
  types: {
    uuid: value => isUUID.v4(value),
    positiveNumber: value =>
      // NaN still reports its type as a number!!
      typeof value === 'number' && !Number.isNaN(value) && value >= 0,
    datestr: value =>
      // must be date similar to 2018-03-22
      typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}$/)
  }
})

export default struct
