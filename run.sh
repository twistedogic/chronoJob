#!/bin/sh
location=$(pwd)
rm -rf ${location}/node/lookupTable.r
cd ${location}/node/ && npm install
cd ${location}/node/dataset/ && rm -rf *
cd ${location}/node && node app.js