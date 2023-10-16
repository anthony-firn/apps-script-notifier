# Apps Script Execution Notifier

A browser extension and companion scripts that notify users on Gnome when a Google Apps Script execution completes in the Script Editor.

## Table of Contents
- [Overview](#overview)
- [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Update Extension ID](#update-extension-id)
   - [Browser Extension](#browser-extension)
   - [Tampermonkey Script](#tampermonkey-script)
   - [Native Messaging Host](#native-messaging-host)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project consists of three main components:

1. **Browser Extension**: Monitors Google Apps Script Editor tabs and listens for execution completion events.
2. **Tampermonkey Script**: Detects "Execution completed" messages in the Script Editor.
3. **Native Messaging Host**: Facilitates communication between the extension and the OS, sending Gnome notifications when the script execution completes.

## Setup

### Prerequisites

Before starting, ensure you have the following:

- Google Chrome installed.
- Basic knowledge of terminal commands.
- Access to the directory where this project's files are stored.

### Update Extension ID

Before proceeding, install the browser extension using the steps provided below and get the extension ID. The extension ID is a unique identifier for your installed extension.

1. Open your Chrome browser.
2. Type `chrome://extensions/` in the address bar and press `Enter`.
3. Find the "Apps Script Execution Notifier" extension in the list.
4. Below the extension name, there will be an ID, which is a long string of letters. Copy this ID.

Once you have the extension ID:

1. Open `tampermonkey_script.js` and replace `YOUR_EXTENSION_ID_HERE` with your actual extension ID.
2. Open `native_messaging_host.json` and replace `YOUR_EXTENSION_ID_HERE` in the `allowed_origins` section with `chrome-extension://YOUR_ACTUAL_EXTENSION_ID/`.

### Browser Extension

1. **Open Chrome**: Launch your Google Chrome browser.

2. **Access Extensions Page**: 
   - Type `chrome://extensions/` into your Chrome browser's address bar and press `Enter`.

3. **Enable Developer Mode**: 
   - In the top-right corner of the Extensions page, toggle the `Developer mode` switch on.

4. **Load the Extension**: 
   - Click the `Load unpacked` button on the Extensions page.
   - A file picker dialog will open. Navigate to where you have this project stored.
   - Choose the `extension/` directory and select `Open`.

Your browser extension is now loaded and active.

### Tampermonkey Script

1. **Install Tampermonkey**: 
   - If you haven’t already, [download and install Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) from the Chrome Web Store.

2. **Access Tampermonkey Dashboard**: 
   - Click on the Tampermonkey icon (it looks like a black circle with two white dots) in the Chrome toolbar.
   - Select `Dashboard`.

3. **Create New Script**: 
   - In the Tampermonkey dashboard, click on the `+` tab (usually the last tab) to create a new user script.

4. **Copy and Paste the Script**: 
   - Open the `tampermonkey/tampermonkey_script.js` file from this project in any text editor.
   - Copy all its content.
   - Go back to the Tampermonkey editor, select any default content there, and paste to replace with the copied script.

5. **Save the Script**: 
   - Click the floppy disk icon or `File` > `Save` in Tampermonkey to save your script.

Your Tampermonkey script is now active and will run on the Google Apps Script Editor.

### Native Messaging Host

1. **Adjust Path in JSON**: 
   - Open the `native_messaging/native_messaging_host.json` file in a text editor.
   - Find the `path` key and replace its value with the absolute path to the `send_gnome_notification.py` on your system. For example: `/home/your_username/apps-script-notifier/native_messaging/send_gnome_notification.py`.
   - **Note**: Replace `your_username` with your actual username and adjust the path if you've placed the project in a different directory.

2. **Copy the JSON to the Correct Directory**:
   - Open a terminal window.
   - Use the `cp` command to copy the modified `native_messaging_host.json` to the required directory for Chrome's native messaging:
      ```bash
      cp apps-script-notifier/native_messaging/native_messaging_host.json ~/.config/google-chrome/NativeMessagingHosts/
      ```

3. **Make the Python Script Executable**: 
   - Still in the terminal, navigate to the directory containing the Python script:
      ```bash
      cd apps-script-notifier/native_messaging/
      ```
   - Make the script executable with the following command, which grants permission for the script to be run as a program:
      ```bash
      chmod +x send_gnome_notification.py
      ```

Your Native Messaging Host is now set up and ready to send notifications to Gnome.

## Usage

1. Open the Google Apps Script Editor and run a script.
2. Wait for the script execution to complete.
3. You will receive a Gnome notification indicating the completion of the script execution.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request. For major changes, please open an issue first to discuss the proposed change.

## License

[GPL-3.0 license ](LICENSE)