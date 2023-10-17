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

// Check if the user is in the Google Apps Script Editor
if (window.location.hostname === 'script.google.com') {
    showNotification();
}