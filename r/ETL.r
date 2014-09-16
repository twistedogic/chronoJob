library(quantmod)
library(lubridate)
library(TTR)
library(rredis)
library(tools)
# parameters
endDate <- Sys.Date()
d <- day(endDate)
m <- month(endDate)
y <- year(endDate) - 2
startDate <- paste(y,m,d,sep="-")
startDate <- as.Date(startDate)
source(paste(path,'/node/lookupTable.r',sep=''))
setwd(paste(path,'/node/dataset/',sep=''))
stockId <- list.files(path='.')
for (i in 1:length(stockId)){
stockId[i] <- file_path_sans_ext(stockId[i])
}
getSymbols(stockId)
setwd(path)