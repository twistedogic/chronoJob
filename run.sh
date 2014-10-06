#!/bin/sh
location=$(pwd)
rm -rf ${location}/report/*.csv
rm -rf ${location}/report/results/*.csv
rm -rf ${location}/node/lookupTable.r
cd ${location}/node/ && npm install
cd ${location}/node/dataset/ && rm -rf *
cd ${location}/node && node app.js
cd ${location} && Rscript r/main.r
#cd ${location}/node && node report.js
