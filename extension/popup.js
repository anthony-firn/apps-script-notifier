// When the popup is opened, we'll check for the last execution status
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('executionStatus', function(data) {
        const statusDiv = document.getElementById('statusDiv');
        if (data.executionStatus === 'completed') {
            statusDiv.textContent = 'Execution completed!';
            statusDiv.classList.add('success');
        } else if (data.executionStatus === 'error') {
            statusDiv.textContent = 'Execution failed!';
            statusDiv.classList.add('error');
        } else {
            statusDiv.textContent = 'No recent executions.';
        }
    });
});

// Optional: You can also listen for changes in the status during the lifetime of the popup being opened
chrome.storage.onChanged.addListener(function(changes) {
    if (changes.executionStatus) {
        const statusDiv = document.getElementById('statusDiv');
        if (changes.executionStatus.newValue === 'completed') {
            statusDiv.textContent = 'Execution completed!';
            statusDiv.classList.add('success');
        } else if (changes.executionStatus.newValue === 'error') {
            statusDiv.textContent = 'Execution failed!';
            statusDiv.classList.add('error');
        }
    }
});