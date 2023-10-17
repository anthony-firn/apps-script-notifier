// Establish a connection to the Native Messaging Host
const port = chrome.runtime.connectNative('com.local.appsscriptnotifier');

// Listener to handle messages from content scripts (like Tampermonkey)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'EXECUTION_COMPLETED') {
        // Send a message to the Native Messaging Host to notify Gnome
        port.postMessage({ text: 'Apps Script Execution Completed' });
        sendResponse({ status: 'Notification sent' });
    }
    return true;  // Keeps the message channel open for asynchronous response
});

// Handle disconnections from the Native Messaging Host (Optional but recommended for error handling)
port.onDisconnect.addListener(() => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    }
});