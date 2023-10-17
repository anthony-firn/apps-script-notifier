// Establish a connection to the Native Messaging Host
const port = chrome.runtime.connectNative('com.local.appsscriptnotifier');

// Listener to handle messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'EXECUTION_COMPLETED') {
        // Send a message to the Native Messaging Host to notify Gnome
        port.postMessage({ text: 'Apps Script Execution Completed' });
        sendResponse({ status: 'Notification sent' });
    } else if (message.type === 'SHOW_NOTIFICATION') {
        showNotification();
        sendResponse({ status: 'Notification displayed' });
    }
    return true;  // Keeps the message channel open for asynchronous response
});

// Function to display a notification
function showNotification() {
    // Create a notification
    let notificationOptions = {
        type: 'basic',
        iconUrl: 'icons/icon128.png',
        title: 'Google Apps Script Notifier',
        message: 'You have opened a script in Google Apps Script Editor!'
    };

    // Display the notification
    chrome.notifications.create('scriptOpenedNotification', notificationOptions);
}

// Handle disconnections from the Native Messaging Host (Optional but recommended for error handling)
port.onDisconnect.addListener(() => {
    if (chrome.runtime.lastError) {
        console.error(JSON.stringify(chrome.runtime.lastError, null, 2));
    }
});