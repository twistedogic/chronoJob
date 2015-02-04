library('xts')
parseTAData <- function(stockId) {
  url <- paste('http://10.0.0.114:3000/api/ta/py/desc/',stockId,sep='')
  res <- read.csv(url)
  tf <- as.xts(res,order.by=as.Date(res$date),unique=T)
  return(tf)
}
#string to numeric
stringToNumeric <- function(data) {
  for(i in 1:ncol(data)){
    data[,i] <- as.numeric(data[,1])
  }
  return(data)
}
taData <- parseTAData('0001.HK')
#remove date
taData <- taData[,!(names(taData) %in% c("date","symbol"))]
numData <- stringToNumeric(taData)
