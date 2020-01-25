const fs = require('fs');
const path = require('path');
const shortcodes = require('../shortcodes');

// API

describe('API', () => {
  it('provides a proper interface', () => {
    expect(typeof shortcodes).toBe('object');
    expect(typeof shortcodes.add).toBe('function');
    expect(typeof shortcodes.parse).toBe('function');
  });
});

// Parsing

describe('Parsing', () => {
  shortcodes.add('youtube', (attrs) => `<div class="youtube" style="padding-top:${(100 / attrs.width * attrs.height)}%"><iframe src="https://www.youtube.com/embed/${attrs.youtube}" frameborder="0"></iframe></div>`);

  shortcodes.add({
    pow: (attrs) => (parseInt(attrs.pow, 10) ** 2),
    sqrt: (attrs) => Math.sqrt(parseInt(attrs.sqrt, 10)),
  });

  [
    'works',
    'parameters',
    'ignore',
  ].forEach((test) => {
    const input = fs.readFileSync(path.resolve(__dirname, 'fixtures', `${test}.txt`), 'utf8');

    it(test, () => {
      expect(shortcodes.parse(input)).toMatchSnapshot();
    });
  });
});
