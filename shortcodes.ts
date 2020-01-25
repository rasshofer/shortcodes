export type ShortcodeCallbackAttributes = {
  [key: string]: string;
};

export type ShortcodeCallback = (attrs: ShortcodeCallbackAttributes) => string;

export type ShortcodeMap = {
  [key: string]: ShortcodeCallback;
};

const shortcodes: ShortcodeMap = {};

export const add = (
  generic: string | ShortcodeMap,
  callback?: ShortcodeCallback,
): void => {
  if (typeof generic === 'string' && callback) {
    shortcodes[generic] = callback;
  } else {
    Object.keys(generic).forEach(name => {
      shortcodes[name] = (generic as ShortcodeMap)[name];
    });
  }
};

export const parse = (input: string): string =>
  input.replace(
    /(?=[^\]])\(([a-z0-9_-]+):(.*?)\)/gim,
    (match, name, values) => {
      if (!shortcodes[name]) {
        return match;
      }

      const attrs: ShortcodeCallbackAttributes = {};
      const splitted = values.split(/(\s*([a-z0-9_-]+):\s*)/gim);

      attrs[name] = splitted.shift().trim();

      for (let i = 0; i < splitted.length; i += 3) {
        attrs[splitted[i + 1].trim()] = splitted[i + 2].trim();
      }

      return shortcodes[name](attrs);
    },
  );
