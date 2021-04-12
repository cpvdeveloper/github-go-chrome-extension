#!/bin/bash

build() {
    echo 'Building Mint application'
    mint build --skip-service-worker --skip-icons
}

replace_manifest() {
    cp manifest.json ./dist
}

build
replace_manifest