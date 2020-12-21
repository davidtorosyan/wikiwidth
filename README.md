# WikiWidth

## Table of contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)

## Introduction

Wiki pages are often too wide to read comfortably.

This extension adds "Toggle width" button that narrows the reading window.

See it in action:
![Demo: demo-toggle.gif](https://github.com/davidtorosyan/wikiwidth/raw/master/images/demo-toggle.gif)

## Setup

Install [TamperMonkey](https://www.tampermonkey.net/) to your favorite web browser.

Once that's done, click [here](https://github.com/davidtorosyan/wikiwidth/raw/master/src/wikiwidth.user.js) to install the script!

Alternatively, navigate to [wikiwidth.user.js](src/wikiwidth.user.js), click "Raw", then click "Install".

## Usage

On every MediaWiki page, you'll find a new link called `Toggle width` under Tools.

Click that link to narrow the page, as in the demo above.

The script remembers your choice on a per-domain basis.

## Development

For developing, clone this repo and install [wikiwidth.dev.user.js](dev/wikiwidth.dev.user.js).

This will install the dev script, which you'll need to modify to point to wherever you cloned the repo.

Note that this works with Chrome but not all other browsers, since this requires local file system access.

## License
[MIT](https://choosealicense.com/licenses/mit/)
