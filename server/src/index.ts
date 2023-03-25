import { initDB } from './services/db.service'
import express from 'express'
import bodyParser from 'body-parser'
import metrics from './routes/metrics'
import cors from './middlewares/cors.middleware';

const PORT = 3001

export const app = express();
app.use(cors);
app.use(bodyParser.json());
app.use('/metrics', metrics);
(async () => {
  try {
    await initDB()
    app.listen(PORT, () => console.log(`App running... PORT: ${PORT}`));
  } catch (err) {
    console.error('Failed to initialize database... server stops here!', err)
  }
})()
