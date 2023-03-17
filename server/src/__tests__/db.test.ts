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

    // Mock the saveMetricsToJSONDb function to test if it is called
    const mockedSaveMetricsToJSONDb = jest.fn()

    // Call the initDB function
    await initDB()

    // Expect that saveMetricsToJSONDb was called with the correct arguments
    expect(mockedSaveMetricsToJSONDb).toHaveBeenCalledWith(expect.any(Array))
  })

  it('loads the existing DB file if it exists', async () => {
    // Define a sample metrics array
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

    // Mock the fs.readFile method to simulate reading the metrics from the file
    const mockedReadFile = jest.mocked(fs.readFile)
    mockedReadFile.mockImplementationOnce(
      (_: PathOrFileDescriptor, callback: (err: Error, data: Buffer | null) => void) => {
        const data = JSON.stringify({ metrics })
        callback(null, Buffer.from(data))
      }
    )

    // Mock the saveMetricsToJSONDb function to test that it is not called
    const mockedSaveMetricsToJSONDb = jest.fn()

    // Call the initDB function
    await initDB()

    // Expect that saveMetricsToJSONDb was not called
    expect(mockedSaveMetricsToJSONDb).not.toHaveBeenCalled()
  })

  it('handles errors thrown when reading the DB file', async () => {
    // Mock the fs.readFile method to simulate an error when reading the file
    const mockedReadFile = jest.mocked(fs.readFile)
    mockedReadFile.mockImplementationOnce(
      (_: PathOrFileDescriptor, callback: (err: Error, data: Buffer | null) => void) => {
        callback(new Error('Read error'), null)
      }
    )

    // Mock the saveMetricsToJSONDb function to test if it is called
    const mockedSaveMetricsToJSONDb = jest.fn()

    // Call the initDB function
    await initDB()

    // Expect that saveMetricsToJSONDb was called with the correct arguments
    expect(mockedSaveMetricsToJSONDb).toHaveBeenCalledWith(expect.any(Array))
  })
})
