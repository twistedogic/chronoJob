library('httr')
library('rredis')
library('rjson')
redisHost <- redisConnect(host='192.168.100.70', returnRef=TRUE)

updateData <- function(symbol,stock) {
    data <- get(stock)
    retval <- data.frame(cbind(Index=as.character(index(data)), coredata(data)))
    rownames(retval) = NULL
    retval <- toJSON(as.list(retval))
    redisSet(symbol,retval)
    url <- 'http://192.168.100.74:3000/api/ta/json/'
    endpoint <- paste(url,symbol,sep='')
    data <- POST(url=endpoint, body=NULL)
    return(data)
}
# for (i in 1:length(stockId)){
i <- 1
    stock <- paste(stockId[i],'TA',sep='')
    symbol <- paste(stockId[i],'R',sep='')
    updateData(symbol,stock)
# }
redisClose()
print('Analysis Complete')