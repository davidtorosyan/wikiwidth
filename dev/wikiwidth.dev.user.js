// ==UserScript==
// @name         wikiwidth.dev
// @namespace    https://github.com/davidtorosyan/wikiwidth
// @version      0.0.1
// @description  limit width on wiki pages
// @author       David Torosyan
// @match        https://*/wiki/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://github.com/davidtorosyan/command.games/raw/monkeymaster-v2.0.0/src/monkeymaster/monkeymaster.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      file://path/to/wikiwidth/src/wikiwidth.user.js
// ==/UserScript==

//
// Install this file and modify the last @require to point to your local path.
//

// Set dev mode variable
window.DEVELOPER_MODE = true;