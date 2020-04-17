import { mockExpress } from '../mocks/express.mock';
import { mockLog, resetMockLog } from '../mocks/log.mock';
import { Server } from '../../src/classes/server.class';

describe('Server', () => {
  it('should initialize route and listen to port', () => {
    const express = mockExpress();
    const log = mockLog();
    const port = '4000';

    new Server(express, port).start();

    expect(express.get).toHaveBeenCalledWith('/', expect.any(Function));
    expect(express.listen).toHaveBeenCalledWith(port, expect.any(Function));
    expect(log).toHaveBeenCalledWith(expect.stringMatching(port));

    resetMockLog();
  });
});
