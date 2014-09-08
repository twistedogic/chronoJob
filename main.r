library(quantmod)
library(lubridate)
library(TTR)
library(rredis)
# parameters
stockId <- c("6823.HK","0001.HK","0008.HK")
endDate <- Sys.Date()
d <- day(endDate)
m <- month(endDate)
y <- year(endDate) - 2
startDate <- paste(y,m,d,sep="-")
startDate <- as.Date(startDate)
getSymbols(stockId,from = startDate, to = endDate)
