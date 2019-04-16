module.exports = (app) => {
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

  async function find(req, res) {
    const database = await res.locals.mongodb.db("admin").admin()
    const dbData = await database.listDatabases()
    const databases = dbData.databases
      .map((db) => db.name)
      .filter((db) => !["admin", "local"].includes(db))

    const snapshots = await new Promise(async (resolve) => {
      const data = []

      for (const dbName of databases) {
        const database = await res.locals.mongodb.db(dbName)
        const snapshots = (await database
          .listCollections(
            { name: { $regex: /^snapshot-/ } },
            { nameOnly: true }
          )
          .toArray()).map((snapshot) => snapshot.name)

        for (const snapshot of snapshots) {
          const database = await res.locals.mongodb.db(dbName)
          const meta = await database
            .collection("meta")
            .findOne({ key: snapshot })

          data.push({
            name: snapshot.replace("snapshot-", ""),
            database: dbName,
            ...meta
          })
        }
      }

      resolve(data)
    })

    const response = { databases, snapshots }

    res.json(response)
  }

  function get(req, res) {
    res.end()
  }
  app.post("/es/bootstrap", create)
  app.post("/es/bootstrap/:id", update)
  app.put("/es/bootstrap/:id", patch)
  app.delete("/es/bootstrap/:id", remove)
  app.get("/es/bootstrap", find)
  app.get("/es/bootstrap/:id", get)
}
