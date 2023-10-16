// ==UserScript==
// @name         Apps Script Execution Notifier
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Detects "Execution completed" messages in Google Apps Script Editor and communicates with a Chrome extension.
// @author       You
// @match        https://script.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to observe changes in the page
    const observePage = (targetNode, callback) => {
        // Configuration of the observer
        const config = {
            attributes: true,
            childList: true,
            subtree: true
        };

        // Callback function to execute when mutations are observed
        const observerCallback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList' && mutation.addedNodes.length) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("Execution completed")) {
                            callback();
                        }
                    }
                }
            }
        };

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver(observerCallback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    };

    // Function to be executed when "Execution completed" is detected
    const executionCompletedCallback = () => {
        console.log('Execution completed detected!');

        // Send a message to the extension
        chrome.runtime.sendMessage('YOUR_EXTENSION_ID_HERE', { type: 'EXECUTION_COMPLETED' }, (response) => {
            console.log(response.status);
        });
    };

    // Start the observation
    observePage(document.body, executionCompletedCallback);

})();