import jsonServer from 'json-server'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'mock-db/db.json'))
const middlewares = jsonServer.defaults()

let port = parseInt(process.env.JSON_SERVER_PORT, 10)
if (isNaN(port) || port < 1024 || port > 65535) {
  console.warn(`Invalid port "${process.env.JSON_SERVER_PORT}", using default 3002`)
  port = 3002
}

server.use(middlewares)
server.use(router)

function startServer(portNumber) {
  server.listen(portNumber, () => {
    console.log(`JSON Server is running on port ${portNumber}`)
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${portNumber} is busy. Trying port ${portNumber + 1}...`)
      startServer(portNumber + 1)
    } else {
      console.error('Server error:', err)
      process.exit(1)
    }
  })
}

startServer(port)