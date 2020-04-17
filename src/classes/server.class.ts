import { Express, Response } from 'express';
import path from 'path';
import MetaUtils from '../utils/meta.utils';

export class Server {
  private readonly express: Express;
  private readonly port: string;

  constructor(express: Express, port: string) {
    this.port = port;
    this.express = express;
  }

  public start(): void {
    this.express.get('/', (_, res) => this.respond(res));
    this.express.listen(this.port, () => this.log());
  }

  private respond(res: Response<string>): void {
    res.sendFile(path.join(__dirname + '/../index.html'));
  }

  private log(): void {
    MetaUtils.log(`Server#${this.port}`, `Listening on port ${this.port}!`);
  }
}
