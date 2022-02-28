> ✨ Help support the maintenance of this package by [sponsoring me](https://github.com/sponsors/ryangjchandler).

# Alpine Mask

This packages provide a custom `x-mask` directive and `$mask` magic variable, powered by [Cleave.js](https://nosir.github.io/cleave.js/).

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/ryangjchandler/alpine-mask?label=version&style=flat-square)
![Build size Brotli](https://img.badgesize.io/ryangjchandler/alpine-mask/main/dist/cdn.min.js.svg?compression=gzip&style=flat-square&color=green)
[![Monthly downloads via CDN](https://data.jsdelivr.com/v1/package/npm/@ryangjchandler/alpine-mask/badge)](https://www.jsdelivr.com/package/npm/@ryangjchandler/alpine-mask)

> This package only supports Alpine v3.x.

## Installation

### CDN

Include the following `<script>` tag in the `<head>` of your document, just before Alpine.

```html
<script
    src="https://cdn.jsdelivr.net/npm/@ryangjchandler/alpine-mask@0.x.x/dist/cdn.min.js"
    defer
></script>
```

### NPM

```bash
npm install @ryangjchandler/alpine-mask
```

Add the `x-mask` directive and `$mask` magic property to your project by registering the plugin with Alpine.

```js
import Alpine from "alpinejs";
import Mask from "@ryangjchandler/alpine-mask";

Alpine.plugin(Mask);

window.Alpine = Alpine;
window.Alpine.start();
```

## Usage

To mask an input, add the `x-mask` directive to your element.

```html
<input x-data x-mask="{ ...allMyCleaveOptionsHere }">
```

By default, the `x-mask` directive will expect a [configuration object](https://github.com/nosir/cleave.js/blob/master/doc/options.md). This gives you full control over the Cleave.js instance.

There's also a list of convenience modifiers below that configure Cleave.js for you with sensible defaults.

### Credit Cards

```html
<input x-mask.card>
```

This will format your input as a credit card input. By default, it will separate each section of the card number into blocks separated by a space.

If you would like to support 19-digit PANs, you can add the `.strict` modifier to the directive.

```html
<input x-mask.card.strict>
```

### Date

To format your input as a date, use the `.date` modifier.

```html
<input x-mask.date>
```

By default, Cleave will format your data in a `d/m/Y` pattern. If you wish to change this, provide a custom pattern inside of the directive expression.

```html
<input x-mask.date="['Y', 'm', 'd']">
```

The input will now be formatted as `Y/m/d`.

### Time

To format your input as a time, use the `.time` modifier.

```html
<input x-mask.time>
```

By default, Cleave will format your time with the `h:m:s` pattern. If you wish to change this, provide a custom pattern inside of the directive expression.

```html
<input x-mask.date="['h', 'm']">
```

The input will now be formatted as `h:m`.

### Numeral / Numeric

If you would like to format a number inside of your input, you can use the `.numeral` modifier.

To format your input as a date, use the `.date` modifier.

```html
<input x-mask.date>
```

By default, Cleave will format your data in a `d/m/Y` pattern. If you wish to change this, provide a custom pattern inside of the directive expression.

```html
<input x-mask.numeral>
```

By default, Cleave formats your number using a comma (`,`) as the thousands-separator and a full-stop (`.`) as the decimal-separator.

If you would to change the thousands delimiter, you can provide either `.delimiter.dot` or `.delimiter.comma`.

```html
<input x-mask.numeral.delimiter.dot>
```

The number `100,000` will now be formatted as `100.000`.

If you would to provide a custom prefix (money fields, etc), you can use the `.prefix` modifier followed by your prefix of choice.

```html
<input x-mask.numeral.prefix.£>
```

This will prefix your input with `£`.

> **NOTE**: HTML attributes are case-insensitive. If you would like to use a more complex prefix or configuration, I recommend using `x-mask` with a custom [configuration object](https://github.com/nosir/cleave.js/blob/master/doc/options.md).

### Blocks

If you would like to segment your input and format the data in blocks, you can use the `.blocks` modifier and provide a list of block lengths as the directive expression.

```html
<input x-mask.blocks="[3, 4, 5]">
```

This would input the following input `333444455555` as `333 4444 55555`.

## Two-way data binding
```html
<div x-data="{ raw: 2000 }">
    <input x-mask.numeral x-model="raw" >
</div>
```

When this input is initialised, `raw` will be formatted and the value will be set on the input. Anytime the input is updated, the raw value will be synced back to the `raw` property.

All changes made to the `raw` property outside of Cleave.js (other functions, etc) will also sync back and be formatted.

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) 2021 Ryan Chandler and contributors

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
