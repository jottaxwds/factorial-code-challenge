import { initDB } from './services/db'
import express from 'express'
import bodyParser from 'body-parser'
import metrics from './routes/metrics'

const PORT = process.env.SERVER_PORT || 3006

export const app = express()
app.use(bodyParser.json())
app.use('/metrics', metrics)

;(async () => {
  try {
    await initDB()
    app.listen(PORT, () => {})
  } catch (err) {
    console.error('Failed to initialize database... server stops here!', err)
  }
})()
