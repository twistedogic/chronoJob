library('RMySQL')
library('xts')
getData <- function(stockId) {
  con <- dbConnect(MySQL(),user="root", password="",dbname="stock", host="10.0.0.114",client.flag=CLIENT_MULTI_STATEMENTS)
  on.exit(dbDisconnect(con))
  sql <- sprintf("select * from ta where symbol = '%s';",stockId)
  res <- dbGetQuery(con, sql)
  for (i in 3:7){
    res[,i] <- as.numeric(res[,i])
  }
  tf <- as.xts(res[,!(names(res) %in% c("date","symbol"))],order.by=as.Date(res$Date),unique=T)
  return(tf)
}
writeTaData <- function(stockId) {
  con <- dbConnect(MySQL(),user="root", password="",dbname="stock", host="10.0.0.114",client.flag=CLIENT_MULTI_STATEMENTS)
  on.exit(dbDisconnect(con))
  sql <- sprintf("select * from ta where symbol = '%s';",stockId)
  res <- dbGetQuery(con, sql)
  for (i in 3:47){
    res[,i] <- as.numeric(res[,i])
  }
  tf <- as.xts(res[,!(names(res) %in% c("date","symbol"))],order.by=as.Date(res$Date),unique=T)
  return(tf)
}