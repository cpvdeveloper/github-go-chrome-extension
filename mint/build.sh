#!/bin/bash

build() {
    echo 'Building Mint application'
    mint build --skip-service-worker --skip-icons
}

copy_background() {
    cp ./js/background.js ./dist
}

replace_manifest() {
    cp manifest.json ./dist
}

build
copy_background
replace_manifest