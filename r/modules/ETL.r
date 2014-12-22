library(quantmod)
library(TTR)
library(tools)
# parameters
# endDate <- Sys.Date()
# d <- day(endDate)
# m <- month(endDate)
# y <- year(endDate) - 2
# startDate <- paste(y,m,d,sep="-")
# startDate <- as.Date(startDate)
# source(paste(path,'/chronoJob/node/lookupTable.r',sep=''))
# setwd(paste(path,'/chronoJob/node/dataset/',sep=''))
# stockId <- list.files(path='.')
# for (i in 1:length(stockId)){
#     stockId[i] <- file_path_sans_ext(stockId[i])
# }
# getSymbols(stockId)
# setwd(path)
source(paste(path,'/chronoJob/r/modules/db.r',sep=''))
stockId <- character()
stockList <- read.csv(paste(path,'/chronoJob/bluechip',sep=''),header=FALSE)
for (i in 1:nrow(stockList)){
    stockId[i] <- unlist(strsplit(as.character(stockList[i,]),"_"))[1]
}
for (i in 1:length(stockId)){
    stockData <- getData(stockId[i])
    assign(stockId[i],na.omit(stockData))
}
# assign(paste(stock,'TA',sep=''),na.omit(data))

print('ETL Complete')
