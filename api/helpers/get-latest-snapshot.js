const { mergeWith, isArray } = require("lodash")
const { ObjectID } = require("mongodb")

module.exports = async function(database, aggregateName) {
  const timestamp = new Date()

  const snapshot = {
    eventIds: [],
    state: [],
    timestamp: new Date(0)
  }

  const events = await database
    .collection("events")
    .find({ aggregateName })
    .sort({ timestamp: 1 })
    .toArray()

  const state = events.reduce((state, event) => {
    const { type, payload } = event
    let { aggregateId } = event

    event._id = new ObjectID(event._id)
    aggregateId = new ObjectID(aggregateId)

    if (type === "CREATE") {
      return [...state, { ...payload, _id: aggregateId }]
    } else if (type === "UPDATE") {
      const target = state.findIndex((entry) => entry._id.equals(aggregateId))

      state[target] = payload

      return state
    } else if (type === "PATCH") {
      const target = state.findIndex((entry) => entry._id.equals(aggregateId))

      mergeWith(state[target], payload, (objValue, srcValue) => {
        if (isArray(objValue)) {
          return objValue.concat(srcValue)
        }
        if (srcValue === null) {
          return objValue
        }
        return undefined
      })

      return state
    } else if (type === "DELETE") {
      return state.filter((entry) => !entry._id.equals(aggregateId))
    } else {
      return state
    }
  }, snapshot.state)

  const response = {
    eventIds: events.map((event) => event._id),
    state,
    timestamp
  }

  return response
}
