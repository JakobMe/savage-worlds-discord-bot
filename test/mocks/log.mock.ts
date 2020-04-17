let log: jest.SpyInstance;

export function mockLog(): jest.SpyInstance {
  log = jest.spyOn(global.console, 'log').mockImplementation();
  return log;
}

export function resetMockLog(): void {
  log.mockRestore();
}

export function mockLogForEach(): jest.SpyInstance {
  beforeEach(() => {
    mockLog();
  });

  afterEach(() => {
    resetMockLog();
  });

  return log;
}
