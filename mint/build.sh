#!/bin/bash

build() {
    echo 'Building Mint application'
    mint build --skip-service-worker --skip-icons
}

copy_background() {
    cp ./js/background.js ./dist
}

copy_icon() {
    cp icon.png ./dist
}

replace_manifest() {
    cp manifest.json ./dist
}

build
copy_background
copy_icon
replace_manifest