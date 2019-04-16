const { exec } = require("child_process")
const open = require("open")

open("http://localhost:3000")
exec("npm run server")
exec("npm run dev")
