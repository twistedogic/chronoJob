library(quantmod)
library(lubridate)
library(TTR)
library(rredis)
library(tools)
# parameters
setwd('/home/myworkspace/chronoJob/node/dataset/')
stockId <- list.files(path='.')
for (i in 1:length(stockId)){
#tmp <- write.zoo(read.csv(file=stockId[i],sep=','),file=stockId[i],sep=',')
stockId[i] <- file_path_sans_ext(stockId[i])
}
endDate <- Sys.Date()
d <- day(endDate)
m <- month(endDate)
y <- year(endDate) - 2
startDate <- paste(y,m,d,sep="-")
startDate <- as.Date(startDate)
getSymbols(stockId,src='csv', to = endDate,return.class='xts')
setwd('/home/myworkspace/')
