const fs = require('fs');
const path = require('path');
const tap = require('tap');
const shortcodes = require('../shortcodes');

// API

tap.equal(typeof shortcodes, 'object');
tap.equal(typeof shortcodes.add, 'function');
tap.equal(typeof shortcodes.parse, 'function');

// Parsing

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
  const input = fs.readFileSync(path.resolve(__dirname, test, 'input.txt'), 'utf8');
  const output = fs.readFileSync(path.resolve(__dirname, test, 'output.txt'), 'utf8');

  tap.equal(shortcodes.parse(input), output);
});
