import sys
import json
import struct
import subprocess
import os

LOG_PATH = "/home/anthony/Dev/apps-script-notifier/native_messaging/log.txt"

def send_message(message):
    """Send a message to the web extension."""
    encoded_content = json.dumps(message).encode('utf-8')
    encoded_length = struct.pack('@I', len(encoded_content))
    sys.stdout.buffer.write(encoded_length)
    sys.stdout.buffer.write(encoded_content)
    sys.stdout.buffer.flush()

def read_message():
    """Read a message from the web extension."""
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        return {}
    message_length = struct.unpack('@I', raw_length)[0]
    message = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message)

def send_notification(message_text):
    """Send a notification to Gnome."""
    subprocess.run(['notify-send', message_text])

def log(message):
    """Write log message to the log file."""
    with open(LOG_PATH, 'a') as log_file:
        log_file.write(f"{message}\n")

if __name__ == '__main__':
    log("Script started.")
    message = read_message()
    log(f"Received message: {message}")

    if 'text' in message:
        send_notification(message['text'])
        send_message({'status': 'Notification sent successfully!'})
        log("Notification sent.")
    else:
        send_message({'error': 'No text found in the received message.'})
        log("Error: No text found in the received message.")