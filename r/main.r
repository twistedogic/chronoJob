library(quantmod)
library(lubridate)
library(TTR)
library(rredis)
# parameters
allStock <- read.csv(file='fullList',sep='_',header=FALSE)
stockId <- as.vector(allStock$V1)
endDate <- Sys.Date()
d <- day(endDate)
m <- month(endDate)
y <- year(endDate) - 2
startDate <- paste(y,m,d,sep="-")
startDate <- as.Date(startDate)
getSymbols(stockId,from = startDate, to = endDate)
