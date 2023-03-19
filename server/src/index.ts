import { initDB } from './services/db'
import express from 'express'
import bodyParser from 'body-parser'
import metrics from './routes/metrics'
import cors from 'cors'

const PORT = 3001

export const app = express()
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002']
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
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
