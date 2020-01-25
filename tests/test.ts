import { readFileSync } from 'fs';
import { resolve } from 'path';
import { add, parse } from '../shortcodes';

// API

describe('API', () => {
  it('provides a proper interface', () => {
    expect(typeof add).toBe('function');
    expect(typeof parse).toBe('function');
  });
});

// Parsing

describe('Parsing', () => {
  add(
    'youtube',
    attrs =>
      `<div class="youtube" style="padding-top:${(100 /
        parseInt(attrs.width, 10)) *
        parseInt(
          attrs.height,
          10,
        )}%"><iframe src="https://www.youtube.com/embed/${
        attrs.youtube
      }" frameborder="0"></iframe></div>`,
  );

  add({
    pow: attrs => String(parseInt(attrs.pow, 10) ** 2),
    sqrt: attrs => String(Math.sqrt(parseInt(attrs.sqrt, 10))),
  });

  ['works', 'parameters', 'ignore'].forEach(test => {
    const input = readFileSync(
      resolve(__dirname, 'fixtures', `${test}.txt`),
      'utf8',
    );

    it(test, () => {
      expect(parse(input)).toMatchSnapshot();
    });
  });
});
