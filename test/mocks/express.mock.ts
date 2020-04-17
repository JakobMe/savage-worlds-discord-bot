import { Express } from 'express';

export const mockExpress = (): Express =>
  (({
    get: jest.fn().mockImplementation((path, cb) => {
      cb(null, { sendFile: jest.fn() });
    }),
    listen: jest.fn().mockImplementation((port, cb) => {
      cb();
    })
  } as unknown) as Express);
