#!/usr/bin/env node

const path = require("path")
const { exec } = require("child_process")
const open = require("open")

open("http://localhost:3000")
exec("npm run server", { cwd: path.resolve(__dirname, "../") })
exec("npm run dev", { cwd: path.resolve(__dirname, "../") })
