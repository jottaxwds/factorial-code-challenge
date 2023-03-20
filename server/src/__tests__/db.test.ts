import fs, { PathOrFileDescriptor } from 'fs'
import { initDB } from '../services/db'

jest.mock('fs')

describe('initDB', () => {
  it('creates a new DB file if it does not exist', async () => {
    const mockedReadFile = jest.mocked(fs.readFile)
    mockedReadFile.mockImplementationOnce(
      (_: PathOrFileDescriptor, callback: (err: Error, data: Buffer | null) => void) => {
        callback(new Error('File not found'), null)
      }
    )

    const mockedSaveMetricsToJSONDb = jest.fn()
    await initDB()
    expect(mockedSaveMetricsToJSONDb).toHaveBeenCalledWith(expect.any(Array))
  })

  it('loads the existing DB file if it exists', async () => {
    const metrics = [
      {
        name: 'metric1',
        value: '10',
        timestamp: 1617697600000
      },
      {
        name: 'metric2',
        value: '20',
        timestamp: 1617697660000
      }
    ]

    const mockedReadFile = jest.mocked(fs.readFile)
    mockedReadFile.mockImplementationOnce(
      (_: PathOrFileDescriptor, callback: (err: Error, data: Buffer | null) => void) => {
        const data = JSON.stringify({ metrics })
        callback(null, Buffer.from(data))
      }
    )
    const mockedSaveMetricsToJSONDb = jest.fn()
    await initDB()
    expect(mockedSaveMetricsToJSONDb).not.toHaveBeenCalled()
  })

  it('handles errors thrown when reading the DB file', async () => {
    const mockedReadFile = jest.mocked(fs.readFile)
    mockedReadFile.mockImplementationOnce(
      (_: PathOrFileDescriptor, callback: (err: Error, data: Buffer | null) => void) => {
        callback(new Error('Read error'), null)
      }
    )

    const mockedSaveMetricsToJSONDb = jest.fn()
    await initDB()
    expect(mockedSaveMetricsToJSONDb).toHaveBeenCalledWith(expect.any(Array))
  })
})
