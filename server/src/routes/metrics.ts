import express from 'express'
import { getAllMetrics, saveMetricToDb } from '../controllers/metrics'
import { Metric, isMetricData } from '../types'

const router = express.Router()

// @route   GET /metrics/all
// @desc    Get all metrics
// @access  Public
router.get('/all', async (_, res) => {
  const { metrics, error } = await getAllMetrics()
  res.json({ metrics, error })
})

// @route   POST /metrics/save
// @desc    Save metric
// @access  Public
router.post('/save', async (req, res) => {
  const data = req.body
  if (!isMetricData(data as Metric)) {
    return res.json({ metric: null, error: 'Data is not correct' })
  }
  const result = await saveMetricToDb(data?.metric)
  res.json(result)
})

export default router
