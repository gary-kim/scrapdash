#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
NAME="io.github.tcode2k16.scrapdash"
COPY_FROM_NAME="$NAME"
TARGET_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"
if [[ "$1" == "firefox" ]]; then
    TARGET_DIR="$HOME/.mozilla/native-messaging-hosts"
    COPY_FROM_NAME="io.github.tcode2k16.scrapdash.firefox"
fi

cp "$DIR/$COPY_FROM_NAME.json" "$TARGET_DIR/$NAME.json"


HOST_PATH="$DIR/main.py"
ESCAPED_HOST_PATH=${HOST_PATH////\\/}
sed -i -e "s/HOST_PATH/$ESCAPED_HOST_PATH/" "$TARGET_DIR/$NAME.json"

chmod o+r "$TARGET_DIR/$NAME.json"
