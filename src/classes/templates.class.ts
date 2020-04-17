import fs from 'fs';
import { TemplateCache, TemplateData } from '../interfaces/template.interface';

export class Templates {
  private static readonly PATH = 'src/templates';
  private static readonly EXTENSION = 'md';
  private readonly cache: TemplateCache = {};

  public render(template: string | string[], data?: TemplateData): string {
    const content = this.getContent(template);
    return data ? this.replaceTokens(content, data) : content;
  }

  private readFile(name: string): string {
    const { PATH, EXTENSION } = Templates;
    return fs.readFileSync(`${PATH}/${name}.${EXTENSION}`, { encoding: 'utf-8' });
  }

  private replaceTokens(content: string, data: TemplateData): string {
    return content.replace(/{{(\w+)}}/g, (_, key) => (data[key] ?? '').toString());
  }

  private getContent(template: string | string[]): string {
    const names = Array.isArray(template) ? template : [template];
    return names
      .map(name => {
        const content = this.cache[name] ?? this.readFile(name);
        this.cache[name] = content;
        return content;
      })
      .join(' ');
  }
}

export const templates = new Templates();
