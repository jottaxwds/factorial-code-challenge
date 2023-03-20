import express from 'express'
import { getAllMetrics, getPaginatedMetrics, getTotals, saveMetricToDb } from '../controllers/metrics'
import { MetricDB, isMetricData } from '../types'
import { getAverages } from '../utils'

const router = express.Router()

// @route   GET /metrics/averages
// @desc    Get hourly/daily/minutly averages
// @access  Public
router.get('/averages', async (_, res) => {
  const { metrics } = await getAllMetrics()
  if (!metrics.length) {
    res.json({ hours: 0, minutes: 0, days: 0 })
  }
  const { hourly, minutly, daily } = getAverages(metrics)
  const perHour = hourly.reduce((acc, { average }) => acc + average, 0) / hourly.length
  const perMinute = hourly.reduce((acc, { average }) => acc + average, 0) / minutly.length
  const perDay = hourly.reduce((acc, { average }) => acc + average, 0) / daily.length
  res.json({ perHour, perMinute, perDay })
})

// @route   GET /metrics/paginated
// @desc    Get paginated metrics
// @access  Public
router.get('/paginated', async (req, res) => {
  const { page, pageSize } = req.query
  const total = await getTotals()
  const { metrics, error } = await getPaginatedMetrics(page, pageSize)
  res.json({ metrics, total, error })
})

// @route   POST /metrics/save
// @desc    Save metric
// @access  Public
router.post('/save', async (req, res) => {
  const metric = req.body
  if (!isMetricData(metric as MetricDB)) {
    return res.json({ metric: null, error: 'Data is not correct' })
  }
  const result = await saveMetricToDb(metric)
  res.json(result)
})

export default router
