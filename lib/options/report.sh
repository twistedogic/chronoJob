#!/bin/bash
loc=$(pwd)
mkdir -p $loc/data
# rptd=$(date +"%y%m%d")
rptd=$1
check=$(ls $loc/data | grep $rptd | wc -l)
if [ $check -eq 0 ]
then
    dqe="dqe$rptd.zip"
    dtop="DTOP_O_20$rptd.zip"
    rp="RP006_$rptd.zip"
    wget http://www.hkex.com.hk/eng/stat/dmstat/dayrpt/$dqe -P $loc/data
    wget http://www.hkex.com.hk/eng/stat/dmstat/OI/$dtop -P $loc/data
    wget http://www.hkex.com.hk/eng/market/rm/rm_dcrm/riskdata/srprices/$rp -P $loc/data
    unzip $loc/data/$dqe -d $loc/data/ 
    unzip $loc/data/$dtop -d $loc/data/ 
    unzip $loc/data/$rp -d $loc/data/ 
    rm -f $loc/data/$dqe $loc/data/$dtop $loc/data/$rp
    rm -f $loc/data/*.rpt $loc/data/*f.raw
fi