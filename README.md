# Apps Script Execution Notifier

A solution that monitors the Google Apps Script Editor and notifies users on a Gnome desktop environment when script execution is complete.

## Table of Contents
- [Introduction](#introduction)
- [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Setting Up the Browser Extension](#setting-up-the-browser-extension)
   - [Setting Up the Tampermonkey Script](#setting-up-the-tampermonkey-script)
   - [Configuring the Native Messaging Host](#configuring-the-native-messaging-host)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is designed to bridge Google Apps Script Editor and the Gnome desktop environment, allowing users to receive a notification whenever a script execution is completed. The solution is split into three components:

1. **Browser Extension**: Tracks the Google Apps Script Editor tabs and listens for execution completion.
2. **Tampermonkey Script**: Identifies when the "Execution completed" message appears in the Editor.
3. **Native Messaging Host**: Links the browser extension to the operating system, triggering Gnome notifications when a script execution ends.

## Setup

### Prerequisites

Before setting up, make sure to:

- Have **Google Chrome** installed.
- Have basic knowledge of navigating directories using a terminal.
- Download or clone this repository to a known location on your system.

### Setting Up the Browser Extension

1. **Open Chrome Extensions Page**:
   - Launch Google Chrome.
   - Enter `chrome://extensions/` into the address bar and hit `Enter`.

2. **Enable Developer Mode**: 
   - Toggle the `Developer mode` switch on (top-right corner).

3. **Install the Extension**: 
   - Click `Load unpacked`.
   - Locate and select the `extension/` directory from this repository.
   - Confirm the installation.

At this point, you should see the "Apps Script Execution Notifier" extension listed on the page. Make note of the extension's unique ID for the next steps.

### Setting Up the Tampermonkey Script

1. **Get Tampermonkey**:
   - If not already installed, [get Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) from the Chrome Web Store.

2. **Add the Script**: 
   - Click the Tampermonkey icon in the Chrome toolbar (a circle with two dots).
   - Go to `Dashboard`.
   - Click the `+` tab to create a new script.
   - Replace any default content with the content of `tampermonkey/tampermonkey_script.js` from this repository.

3. **Update Extension ID**:
   - In the script, find `YOUR_EXTENSION_ID_HERE` and replace it with the extension ID noted earlier.
   - Save the script in Tampermonkey.

The Tampermonkey script will now communicate with the browser extension when in the Google Apps Script Editor.

### Configuring the Native Messaging Host

1. **Update Script and JSON Paths**:
   - Open `native_messaging/native_messaging_host.json` in a text editor.
   - Adjust the `path` to point to the location of `send_gnome_notification.py` on your system.
   - Update `YOUR_EXTENSION_ID_HERE` with the extension ID from earlier.

2. **Position the JSON Configuration**:
   - Copy the updated `native_messaging_host.json` to the Chrome native messaging directory. This can be done using the terminal:
     ```bash
     cp path_to_repo/native_messaging/native_messaging_host.json ~/.config/google-chrome/NativeMessagingHosts/
     ```

3. **Grant Script Permissions**: 
   - Give execution permissions to the Python script:
     ```bash
     chmod +x path_to_repo/native_messaging/send_gnome_notification.py
     ```

With this, the Native Messaging Host will be able to dispatch Gnome notifications when informed by the browser extension.

## Usage

1. Open the Google Apps Script Editor and execute a script.
2. Once the script execution is done, a Gnome notification will pop up, confirming the completion.

## Contributing

We appreciate contributions! If you wish to help, kindly fork this repository and submit a pull request. For major updates, it's recommended to open an issue first to discuss potential changes.

## License

Distributed under the [GPL-3.0 license](LICENSE).