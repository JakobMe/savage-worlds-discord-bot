import { Express, Response } from 'express';
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
    res.send("Beep boop I'm a Discord bot 🤖");
  }

  private log(): void {
    MetaUtils.log('Server#0000', `Listening on Port ${this.port}...`);
  }
}
