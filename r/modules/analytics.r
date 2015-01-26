library('xts')
library('httr')
parseTAData <- function(stockId) {
  url <- paste('http://10.0.0.114:3000/api/ta/desc/',stockId,sep='')
  res <- read.csv(url)
  tf <- as.xts(res,order.by=as.Date(res$date),unique=T)
  return(tf)
}
taData <- parseTAData('0001.HK')
#remove date
taData <- taData[,!(names(taData) %in% c("date"))]
#string to numeric
stringToNumeric <- fuction(data) {
  cn <- colnames(data)
  res <- as.character()
  for (i in 1:ncol(data)) {
    tmp <- as.numeric(as.character(data[,i]))
    res <- cbind(res,tmp)
  }
}
