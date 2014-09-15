buyList <- character()
sellList <- character()
allRSI <- character()
for (i in 1:length(stockId)){
  stock <- stockId[i]
  closePrice <- Cl(get(stock))
  rsi<-RSI(closePrice)
  rsi<-as.vector(last(rsi))
  price <- as.vector(last(closePrice))
  rsiBuy <- rsi <= 35
  rsiSell <- rsi >= 70
  if(rsiBuy == TRUE){
    buyList <- rbind(buyList,c(stock,price,rsi))
  }
  if(rsiSell == TRUE){
    sellList <- rbind(sellList,c(stock,price,rsi))
  }
  allRSI <- rbind(allRSI,c(stock,price,rsi))
}