rm(list=ls())
library('xts')
library('TSA')
library('TTR')
library('quantmod')
library('stats')
library('forecast')
library('GeneCycle')
parseTAData <- function(stockId) {
  url <- paste('http://api-twistedogic01.rhcloud.com/api/hist/',stockId,sep='')
  res <- read.csv(url)
  tf <- as.xts(res[,3:7],order.by=as.Date(res$date),unique=T)
  return(tf)
}
#string to numeric
stringToNumeric <- function(data) {
  for(i in 1:ncol(data)){
    for(j in 1:nrow(data)){
      data[j,i] <- as.numeric(data[j,i])
    }
  }
  return(data)
}
taData <- parseTAData('0001.HK')
