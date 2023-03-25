import { app } from '..'
import request from 'supertest'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { DB_SORTING, DB_URL } from '../constants'

const supertest = request(app)

const allSuccess = [
  { id: 1, name: 'm1', value: '10', timestamp: 1620797411229 },
  { id: 2, name: 'm2', value: '20', timestamp: 1620797411222 },
  { id: 3, name: 'm3', value: '30', timestamp: 1620797411223 },
  { id: 4, name: 'm4', value: '40', timestamp: 1620797411224 }
]

const PAGINATED_QUERY_PARAMS = '_page=1&_limit=8'

describe('/metrics', () => {
  describe('/paginated', () => {
    it('Should return first page metrics if retrieved from DB', done => {
      const mock = new AxiosMockAdapter(axios)
      const expectRes = { metrics: allSuccess, total: '0', error: null }
      mock.onGet(`${DB_URL}/${DB_SORTING}&${PAGINATED_QUERY_PARAMS}`).reply(200, allSuccess)
      supertest
        .get('/metrics/paginated?page=1&pageSize=8')
        .send()
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectRes))
          done()
        })
    })

    it('Should return empty metrics and error desciption if error happened in db data fetching', done => {
      const mock = new AxiosMockAdapter(axios)
      const expectRes = { metrics: [], total: '0', error: 'Error 400: Request failed with status code 400' }
      mock.onGet(`${DB_URL}/${DB_SORTING}&${PAGINATED_QUERY_PARAMS}`).reply(400, {})
      supertest
        .get('/metrics/paginated?page=1&pageSize=8')
        .send()
        .end((__, res) => {
          expect(res.status).toBe(200)
          expect(JSON.stringify(res.body)).toEqual(JSON.stringify(expectRes))
          done()
        })
    })
  })
})
