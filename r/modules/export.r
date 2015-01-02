library('RMySQL')
updateData <- function(symbol,stockId) {
  con <- dbConnect(MySQL(),user="root", password="",dbname="stock", host="192.168.100.74",client.flag=CLIENT_MULTI_STATEMENTS)
  on.exit(dbDisconnect(con))
  if(nrow(stockId)>0){
      sql <- "insert into ta (symbol ,Date ,Open ,High ,Low ,Close ,Volume ,pricechange ,rsi ,smi ,smiSignal ,macd ,macdSignal ,Lower ,Middle ,Upper ,ptcB ,tr ,atr ,trueHigh ,trueLow ,cV ,tdi ,di ,DIp ,DIn ,DX ,ADX ,mfi ,obv ,sar ,dviMag ,dviStr ,dvi ,sma10 ,sma20 ,sma50 ,sma100 ,sma150 ,sma250 ,roc5 ,roc10 ,roc20 ,roc50 ,roc100 ,roc150 ,roc250) values"
      for (j in 1:nrow(stockId)){
        values <- paste(stockId[j],collapse = ',')
        query <- paste(sql," ('",symbol,"','",index(stockId[j]),"',",values,");",sep='')
        res <- dbGetQuery(con, query)
      }
      return(paste(symbol, " complete",sep=''))
  } else {
    return("Error")
  }
}
for (i in 1:length(stockId)){
  stock <- paste(stockId[i],'TA',sep='')
  updateData(stockId[i],get(stock))
}
print('Analysis Complete')