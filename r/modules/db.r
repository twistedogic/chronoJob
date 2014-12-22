library('RMySQL')
library('xts')
getData <- function(stockId) {
  con <- dbConnect(MySQL(),user="root", password="",dbname="stock", host="192.168.100.74",client.flag=CLIENT_MULTI_STATEMENTS)
  on.exit(dbDisconnect(con))
  sql <- sprintf("select * from hist where symbol = '%s';",stockId)
  res <- dbGetQuery(con, sql)
  for (i in 3:7){
    res[,i] <- as.numeric(res[,i])
  }
  tf <- as.xts(res[,3:7],order.by=as.Date(res$Date),unique=T)
  return(tf)
}