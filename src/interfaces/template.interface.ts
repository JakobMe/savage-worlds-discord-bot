export interface TemplateCache {
  [template: string]: string;
}

export interface TemplateData {
  [key: string]: string | string[] | number | number[];
}
