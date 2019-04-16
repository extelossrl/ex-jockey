const { EJSON } = require("bson")
const getLatestSnapshot = require("./helpers/get-latest-snapshot")

module.exports = (app) => {
  async function exportEvents(req, res) {
    const dbName = req.params.database
    const database = await res.locals.mongodb.db(dbName)

    const events = await database
      .collection("events")
      .find()
      .toArray()
    const filename = `${dbName}@${new Date().getTime()}.events.json`
    const response = EJSON.stringify(events, null, 2)

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Content-disposition", `attachment; filename=${filename}`)
    res.send(response)
  }

  async function exportSnapshot(req, res) {
    const dbName = req.params.database
    const aggregate = req.params.aggregate
    const database = await res.locals.mongodb.db(dbName)

    const snapshot = await getLatestSnapshot(database, aggregate)
    const filename = `${dbName}@${aggregate}@${new Date().getTime()}.db.json`
    const response = EJSON.stringify(snapshot.state, null, 2)

    res.setHeader("Content-Type", "application/json")
    res.setHeader("Content-disposition", `attachment; filename=${filename}`)
    res.send(response)
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

  app.get("/es/:database/exports/events", exportEvents)
  app.get("/es/:database/exports/snapshot/:aggregate", exportSnapshot)

  app.post("/es/:database/exports", create)
  app.post("/es/:database/exports/:id", update)
  app.put("/es/:database/exports/:id", patch)
  app.delete("/es/:database/exports/:id", remove)
  app.get("/es/:database/exports", find)
  app.get("/es/:database/exports/:id", get)
}
