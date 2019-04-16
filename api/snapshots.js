const getLatestSnapshot = require("./helpers/get-latest-snapshot")
const tod = require("./helpers/tod")

module.exports = (app) => {
  async function getLatest(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const aggregate = req.params.aggregate

    const response = await getLatestSnapshot(database, aggregate)

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

  async function remove(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const snapshot = `snapshot-${req.params.name}`

    await database.collection(snapshot).drop()
    await database.collection("meta").deleteOne({ key: snapshot })
  }

  function find(req, res) {
    res.end()
  }

  async function get(req, res) {
    const database = await res.locals.mongodb.db(req.params.database)
    const snapshot = `snapshot-${req.params.name}`

    const search = tod(() => JSON.parse(req.query.search), {})
    const sortField = req.query.sortField || ""
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
    const page = parseInt(req.query.page) || 0
    const perPage = parseInt(req.query.perPage) || 0

    const total = await database.collection(snapshot).countDocuments(search)
    const data = await database
      .collection(snapshot)
      .find(search)
      .sort({ [sortField]: sortOrder })
      .skip(page * perPage)
      .limit(perPage)
      .toArray()
    const response = { data, total }

    res.json(response)
  }

  app.get("/es/:database/snapshots/latest/:name", getLatest)

  app.post("/es/:database/snapshots", create)
  app.post("/es/:database/snapshots/:name", update)
  app.put("/es/:database/snapshots/:name", patch)
  app.delete("/es/:database/snapshots/:name", remove)
  app.get("/es/:database/snapshots", find)
  app.get("/es/:database/snapshots/:name", get)
}
