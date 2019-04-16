const app = require("express")()
const cors = require("cors")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const { MongoClient } = require("mongodb")
const requireGlob = require("require-glob")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload())

app.use(async (req, res, next) => {
  res.locals.mongodb = await MongoClient.connect(
    req.headers.mongodb || Buffer.from(req.query.mongodb, "base64").toString(),
    {
      useNewUrlParser: true
    }
  )

  next()
})

Object.entries(requireGlob.sync(["*.js", "!index.js"])).forEach(([_, route]) =>
  route(app)
)

app.listen(3001, () => {
  console.log("Server listening on http://localhost:3001")
})
