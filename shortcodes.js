const shortcodes = {};

const add = (generic, callback) => {
  if (typeof generic === 'string' && callback) {
    shortcodes[generic] = callback;
  } else {
    Object.keys(generic).forEach((name) => {
      shortcodes[name] = generic[name];
    });
  }
};

const parse = (input) => {

  return input.replace(/(?=[^\]])\(([a-z0-9_-]+):(.*?)\)/gmi, (match, name, values) => {

    if (!shortcodes[name]) {
      return match;
    }

    const attrs = {};
    const splitted = values.split(/(\s*([a-z0-9_-]+)\:\s*)/gmi);

    attrs[name] = splitted.shift().trim();

    for (let i = 0; i < splitted.length; i += 3) {
      attrs[splitted[i + 1].trim()] =  splitted[i + 2].trim();
    }

    return shortcodes[name](attrs);

  });

};

module.exports = {
  add,
  parse
};
