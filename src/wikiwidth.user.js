// ==UserScript==
// @name         wikiwidth
// @namespace    https://github.com/davidtorosyan/wikiwidth
// @version      1.0.0
// @description  limit width on wiki pages
// @author       David Torosyan
// @match        https://*/wiki/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://github.com/davidtorosyan/command.games/raw/monkeymaster-v2.0.0/src/monkeymaster/monkeymaster.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';

    const console = monkeymaster.setupConsole('wikiwidth');
    console.debug('Loaded');

    function main() {
        $(document).ready(dom.setup);
    }

    const dom = {};
    (function() {
        function setup() {
            if (!findElements()) {
                return;
            }
            setupStyle();
            addTool();
            initNarrow();
        }
        dom.setup = setup;

        // private

        let $content;
        const narrowContentClass = 'narrow-content';
        const toggleWidthId = 't-togglewidth';

        function findElements() {
            $content = $('#content');
            if ($content.length === 0) {
                console.warn('Could not find Content');
                return false;
            }
            return true;
        }
    
        function setupStyle() {
            $('<style>')
            .prop('type', 'text/css')
            .html(`
                .${narrowContentClass}, .md.wiki {
                    max-width: 60em !important; 
                    border-right-width: 1px;
                }
            `)
            .appendTo('head');
        }
    
        function addTool() {
            console.debug('Adding toggle button');

            const $tools = $('#p-tb');
            if ($tools.length === 0) {
                console.warn('Could not find Tools section');
                return;
            }

            const $list = $tools.find('ul');
            if ($list.length === 0) {
                console.warn('Could not find Tools list');
                return;
            }

            const $link = $('<a>', {
                'href': 'javascript:void(0)',
                'text': 'Toggle width'
            });
            const $toggle = $('<li>', {
                'id': toggleWidthId
            }).append($link);
            $list.append($toggle);
    
            $link.on('click', toggleNarrow);
        }
        
        function toggleNarrow() {
            $content.toggleClass(narrowContentClass);
            const isEnabled = $content.hasClass(narrowContentClass);
            console.debug(`Toggling width, isEnabled=${isEnabled}`);
            storage.toggleDomain(isEnabled);
        }

        function initNarrow() {
            const isEnabled = storage.isDomainEnabled();
            console.debug(`Initializing width, isEnabled=${isEnabled}`);
            $content.toggleClass(narrowContentClass, isEnabled);
        }
    }());

    const storage = {};
    (function() {
        function isDomainEnabled() {
            const domain = getCurrentDomain();
            const enabledDomains = getDomains();
            return enabledDomains.includes(domain);
        }
        storage.isDomainEnabled = isDomainEnabled;
    
        function toggleDomain(shouldEnable) {
            const domain = getCurrentDomain();
            const enabledDomains = getDomains();
            const isEnabled = enabledDomains.includes(domain);
            if (isEnabled === shouldEnable) {
                console.debug(`Domain ${domain} matches desired state shouldEnable=${shouldEnable}`);
                return;
            }
            let updatedDomains;
            if (shouldEnable) {
                updatedDomains = enabledDomains.concat(domain);
                console.debug(`Adding ${domain}`);
            }
            else {
                updatedDomains = enabledDomains.filter(d => d !== domain);
                console.debug(`Removing ${domain}`);
            }
            saveDomains(updatedDomains);
        }
        storage.toggleDomain = toggleDomain;

        // private

        const domainListStorageKey = 'wikiwidth_domains';

        function getCurrentDomain() {
            return window.location.host;
        }
        
        function getDomains() {
            const stored = GM_getValue(domainListStorageKey);
            if (stored === undefined) {
                console.debug(`Empty storage, no domains enabled.`);
                return [];
            }
            console.debug(`Fetching storage from ${stored.date}`);
            return stored.payload;
        }
    
        function saveDomains(domains) {
            if (domains === undefined || domains.length === 0) {
                console.debug(`No domains left, removing storage.`);
                GM_deleteValue(domainListStorageKey);
            }
            else {
                console.debug(`Updating storage.`);
                GM_setValue(domainListStorageKey, {
                    payload: domains,
                    date: new Date().toJSON()
                });
            }
        }
    }());

    main();
})();