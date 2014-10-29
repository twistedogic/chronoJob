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
source(paste(path,'/chronoJob/node/lookupTable.r',sep=''))
setwd(paste(path,'/chronoJob/node/dataset/',sep=''))
stockId <- list.files(path='.')
for (i in 1:length(stockId)){
    stockId[i] <- file_path_sans_ext(stockId[i])
}
getSymbols(stockId)
setwd(path)
print('ETL Complete')
