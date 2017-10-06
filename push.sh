#!/usr/bin/env bash
git add -u
git commit -m'a'

git pull

git push origin master

ionic cordova build android --prod

ionic cordova build ios --prod
