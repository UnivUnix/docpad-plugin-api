#!/bin/sh

npm install -g npm
npm install coffee-script
./node_modules/.bin/cake install
git clone https://github.com/bevry/docpad.git
cd docpad
npm install
npm run compile
npm link
cd ..
npm install
npm link docpad
