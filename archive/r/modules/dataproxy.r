library('xts')
parseData <- function(stockId) {
    url <- paste('http://api-twistedogic01.rhcloud.com/api/hist/',stockId,sep='')
    DF <- read.csv(url)
    if(nrow(DF) > 30 ){
      res <- DF[apply(DF[c(3:7)],1,function(z) !any(z==0)),]
      tf <- as.xts(res[,3:7],order.by=as.Date(res$Date),unique=T)
      return(tf)
    }
}