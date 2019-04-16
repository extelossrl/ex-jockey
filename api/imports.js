const { EJSON } = require("bson")
const { omit } = require("lodash")

module.exports = (app) => {
  async function importEvents(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const { data } = req.files.file

    const events = EJSON.parse(data.toString())
    const response = database.collection("events").insertMany(events)

    res.json(response)
  }

  async function importData(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const aggregate = req.params.aggregate
    const { data } = req.files.file

    const items = EJSON.parse(data.toString())
    const events = items.map((item) => ({
      type: "CREATE",
      aggregateName: aggregate,
      aggregateId: item._id,
      payload: omit(item, ["_id"]),
      user: {
        username: "exjockey",
        role: "ADMIN"
      },
      timestamp: new Date()
    }))
    const response = database.collection("events").insertMany(events)

    res.json(response)
  }

  function create(req, res) {
    res.end()
  }

  function update(req, res) {
    res.end()
  }

  function patch(req, res) {
    res.end()
  }

  function remove(req, res) {
    res.end()
  }

  function find(req, res) {
    res.end()
  }

  function get(req, res) {
    res.end()
  }

  app.post("/es/:database/imports/events", importEvents)
  app.post("/es/:database/imports/data/:aggregate", importData)

  app.post("/es/:database/imports", create)
  app.post("/es/:database/imports/:id", update)
  app.put("/es/:database/imports/:id", patch)
  app.delete("/es/:database/imports/:id", remove)
  app.get("/es/:database/imports", find)
  app.get("/es/:database/imports/:id", get)
}
