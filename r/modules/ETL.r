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
# source(paste(path,'/chronoJob/r/modules/db.r',sep=''))
path <- getwd()
source(paste(path,'/chronoJob/r/modules/dataproxy.r',sep=''))

stockId <- character()
stockList <- read.csv(paste('http://api-twistedogic01.rhcloud.com/api/sector/Financials'),header=FALSE)
for (i in 1:nrow(stockList)){
    stockId[i] <- unlist(strsplit(as.character(stockList[i,]),"_"))[1]
}
updatestockId <- character()
for (i in 1:length(stockId)){
    stockData <- parseData(stockId[i])
    if(!is.null(stockData) && nrow(stockData) > 30){
      if(last(index(stockData)) == Sys.Date()){
        assign(stockId[i],stockData)
        updatestockId <- c(updatestockId,stockId[i])
      }
    } 
}
stockId <- updatestockId
# assign(paste(stock,'TA',sep=''),na.omit(data))

print('ETL Complete')
