library('xts')
parseData <- function(stockId) {
    url <- paste('http://10.0.0.114:3000/api/hist/desc/',stockId,sep='')
    DF <- read.csv(url)
    res <- DF[apply(DF[c(3:7)],1,function(z) !any(z==0)),]
    tf <- as.xts(res[,3:7],order.by=as.Date(res$date),unique=T)
    return(tf)
}