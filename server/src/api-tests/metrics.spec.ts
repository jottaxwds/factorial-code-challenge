import { app } from '..'
import request from 'supertest'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { DB_URL } from '../constants'

const supertest = request(app)

const allSuccess = [
  { id: 1, name: 'm1', value: '10', timestamp: 1620797411229 },
  { id: 2, name: 'm2', value: '20', timestamp: 1620797411222 },
  { id: 3, name: 'm3', value: '30', timestamp: 1620797411223 },
  { id: 4, name: 'm4', value: '40', timestamp: 1620797411224 }
]
const metricPayload = {
  metric: {
    name: 'x',
    value: '000',
    timestamp: 1620797411666
  }
}

describe('/metrics', () => {
  describe('/all', () => {
    it('Should return all metrics if retrieved from DB', done => {
      const mock = new AxiosMockAdapter(axios)
      const expectRes = { metrics: allSuccess, error: null }
      mock.onGet(DB_URL).reply(200, allSuccess)
      supertest
        .get('/metrics/all')
        .send()
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectRes))
          done()
        })
    })

    it('Should return empty metrics and error desciption if error happened in db data fetching', done => {
      const mock = new AxiosMockAdapter(axios)
      const expectRes = { metrics: [], error: 'Error 400: Request failed with status code 400' }
      mock.onGet(DB_URL).reply(400, {})
      supertest
        .get('/metrics/all')
        .send()
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectRes))
          done()
        })
    })
  })

  describe('/save', () => {
    it('Should post metric if has right Metric type/format', done => {
      const mock = new AxiosMockAdapter(axios)
      const expectedResponse = { metric: metricPayload.metric, error: null }
      mock.onPost(DB_URL).reply(201, { ...metricPayload.metric })
      supertest
        .post('/metrics/save')
        .send(metricPayload)
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectedResponse))
          done()
        })
    })

    it('Should NOT allow post metric if Metric type/format is NOT correct', done => {
      const mock = new AxiosMockAdapter(axios)
      mock.onPost(DB_URL).reply(201, { metric: null })
      const expectedResponse = { metric: null, error: 'Data is not correct' }
      supertest
        .post('/metrics/save')
        .send({ whatever: 'thing' })
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectedResponse))
          done()
        })
    })

    it('Should return empty metrics and error desciption if error happened in db posting new metric', done => {
      const mock = new AxiosMockAdapter(axios)
      const expectRes = { metrics: [], error: 'Error 400: Request failed with status code 400' }
      mock.onPost(DB_URL).reply(400, {})
      supertest
        .post('/metrics/save')
        .send(metricPayload)
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectRes))
          done()
        })
    })
  })
})
