# Shortcodes

> A simple library for creating shortcode macros to be used within content blocks

[![Build Status](https://travis-ci.org/rasshofer/shortcodes.svg)](https://travis-ci.org/rasshofer/shortcodes)
[![Dependency Status](https://david-dm.org/rasshofer/shortcodes/dev-status.svg)](https://david-dm.org/rasshofer/shortcodes)

## Usage

```shell
npm install --save shortcodes
```

The example below shows a basic shortcode to embed a YouTube video. The actual embedment is done by the appropiate handler, called every time the shortcode is used.

```js
const shortcodes = require('shortcodes');

shortcodes.add('youtube', (attrs) => {
  return `
    <div class="youtube" style="padding-top:${(100 / attrs.width * attrs.height)}%">
      <iframe src="https://www.youtube.com/embed/${attrs.youtube}" frameborder="0"></iframe>
    </div>
  `;
});

shortcodes.parse(`
  Lorem ipsum dolor sit amet, consetetur sadipscing elitr.

  (youtube: jNQXAC9IVRw width: 600 height: 400)

  Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
`);
```

## API

Shortcodes are written by providing a handler function. They accept parameters (= attributes) and return a result (= the shortcode output).

### `shortcode.add(name, callback)`

Registers a shortcode handler for the shortcode name. It takes two parameters: the shortcode `name` (= the string used in a content block), and the `callback` function.

Shortcode names should be all lowercase and use all letters, but numbers and underscores work fine too. Be wary of using hyphens (dashes), you'll be better off not using them.

A single parameter is passed to the shortcode callback function (= an object containing all the extracted attributes). For example, the attributes object for the YouTube shortcode shown above would look like this.

```json
{
  "youtube": "jNQXAC9IVRw",
  "width": "600",
  "height": "400"
}
```

### `shortcode.add(someObject)`

In addition to `shortcode.add(name, callback)`, you may add entire objects (= lists) of handlers (which is useful for extracting/importing shortcodes into/from plugins).

```js
shortcodes.add({
  pow: (attrs) => Math.pow(parseInt(attrs.pow, 10), 2),
  sqrt: (attrs) => Math.sqrt(parseInt(attrs.sqrt, 10))
});
```

### `shortcode.parse(input)`

Searches `input` for shortcodes, filters shortcodes through their hooks, and returns the modified content with shortcodes filtered out. If there are no (or invalid) shortcode tags defined, then the content will be returned without any filtering. This might cause issues when specific shortcodes are not available but the shortcode will still show up in the post/content.

## Changelog

* 1.0.0
  * Migrate to TypeScript
* 0.0.1
  * Initial version

## License

Copyright (c) 2020 [Thomas Rasshofer](https://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
