const { ObjectID } = require("mongodb")
const tod = require("./helpers/tod")

module.exports = (app) => {
  async function create(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)

    const type = req.body.type
    const aggregateName = req.body.aggregateName
    const aggregateId = new ObjectID(req.body.aggregateId || null)
    const timestamp = new Date(req.body.timestamp)
    const payload = req.body.payload
    const user = req.body.user

    const response = database.collection("events").insertOne({
      type,
      aggregateName,
      aggregateId,
      timestamp,
      payload,
      user
    })

    res.json(response)
  }

  async function update(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const id = new ObjectID(req.params.id)

    const type = req.body.type
    const aggregateName = req.body.aggregateName
    const aggregateId = new ObjectID(req.body.aggregateId || null)
    const timestamp = new Date(req.body.timestamp)
    const payload = req.body.payload
    const user = req.body.user

    const response = database.collection("events").updateOne(
      { _id: id },
      {
        $set: {
          type,
          aggregateName,
          aggregateId,
          timestamp,
          payload,
          user
        }
      }
    )

    res.json(response)
  }

  function patch(req, res) {
    res.end()
  }

  async function remove(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const id = new ObjectID(req.params.id)

    const response = await database.collection("events").deleteOne({ _id: id })

    res.json(response)
  }

  async function find(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)

    const search = tod(() => JSON.parse(req.query.search), {})
    const sortField = req.query.sortField || "timestamp"
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
    const page = parseInt(req.query.page) || 0
    const perPage = parseInt(req.query.perPage) || 0

    const total = await database.collection("events").countDocuments(search)
    const data = await database
      .collection("events")
      .find(search)
      .sort({ [sortField]: sortOrder })
      .skip(page * perPage)
      .limit(perPage)
      .toArray()
    const response = { data, total }

    res.json(response)
  }

  async function get(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const id = new ObjectID(req.params.id)

    const response = await database.collection("events").findOne({ _id: id })

    res.json(response)
  }

  app.post("/es/:database/events", create)
  app.post("/es/:database/events/:id", update)
  app.put("/es/:database/events/:id", patch)
  app.delete("/es/:database/events/:id", remove)
  app.get("/es/:database/events", find)
  app.get("/es/:database/events/:id", get)
}
