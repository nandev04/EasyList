import fs from 'fs';
import { EmailTemplates, namesTemplates } from '../shared/types/email-templates.js';

const templates: Partial<Record<namesTemplates, Promise<string>>> = {};

function loadTemplate(name: namesTemplates): Promise<string> {
  if (!templates[name]) {
    templates[name] = fs.promises.readFile(`dist/emails/html/${name}.html`, 'utf-8');
  }

  return templates[name];
}

export async function renderTemplate<T extends keyof EmailTemplates>(
  template: T,
  data: EmailTemplates[T]
) {
  return loadTemplate(template).then((html) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
      return acc.replaceAll(`{{ ${key} }}`, String(value));
    }, html);
  });
}
