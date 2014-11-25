#!/bin/sh
location=$(pwd)
rm -rf ${location}/chronoJob/report/*.csv
rm -rf ${location}/chronoJob/report/results/*.csv
rm -rf ${location}/chronoJob/node/lookupTable.r
cd ${location}/chronoJob/node/ && npm install
cd ${location}/chronoJob/node/dataset/ && rm -rf *
cd ${location}/chronoJob/node && node app.js
Rscript chronoJob/r/main.r
#cd ${location}/chronoJob/node && node report.js
