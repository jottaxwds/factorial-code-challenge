import fs from 'fs'
import { initDB } from '../db.service'
import { DB_JSON_PATH } from '../../constants';

describe('initDB', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.spyOn(fs, 'readFile').mockRestore();
  });
  
  it('should call `fs.writeFileSync` with default data size when file does not exist', async () => {
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    const DEFAULT_DB_DATA_AMOUNT = 10;

    jest.spyOn(fs, 'readFileSync').mockImplementation(() => null);

    await initDB(DEFAULT_DB_DATA_AMOUNT);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(DB_JSON_PATH);
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledWith('./db.json', expect.any(String));
  });

  it('should NOT call `fs.writeFileSync` when file exists and has metrics', async () => {
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from(JSON.stringify({ metrics: ['data'] })));

    await initDB();

    expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(readFileSyncSpy).toHaveBeenCalledWith(DB_JSON_PATH);
    expect(writeFileSyncSpy).not.toHaveBeenCalled();
  });

  it('should call `fs.writeFileSync` with default data size when file exists but is empty', async () => {
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    const DEFAULT_DB_DATA_AMOUNT = 10;

    jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from(''));

    await initDB(DEFAULT_DB_DATA_AMOUNT);
    expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    expect(fs.readFileSync).toHaveBeenCalledWith(DB_JSON_PATH);
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledWith('./db.json', expect.any(String));
  });

  it('should call `fs.writeFileSync` with default data size when file exists but has invalid JSON', async () => {
    const DEFAULT_DB_DATA_AMOUNT = 10;
  
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync').mockImplementation(() => Buffer.from('invalid-json'));
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');

    await initDB(DEFAULT_DB_DATA_AMOUNT);

    expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(readFileSyncSpy).toHaveBeenCalledWith(DB_JSON_PATH);
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(DB_JSON_PATH, expect.any(String));
  });
});