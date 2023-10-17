// Check if the user is in the Google Apps Script Editor
if (window.location.hostname === 'script.google.com') {
    chrome.runtime.sendMessage({type: 'SHOW_NOTIFICATION'});
}