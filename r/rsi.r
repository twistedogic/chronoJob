buyList <- character()
sellList <- character()
allRSI <- character()
for (i in 2:length(stockId)){
  stock <- stockId[i]
  rsi<-RSI(Cl(get(stock)))
  rsi<-as.vector(last(rsi))
  rsiBuy <- rsi <= 35
  rsiSell <- rsi >= 70
  if(rsiBuy == TRUE){
    buyList <- rbind(buyList,c(stock,rsi))
  }
  if(rsiSell == TRUE){
    sellList <- rbind(sellList,c(stock,rsi))
  }
  allRSI <- rbind(allRSI,c(stock,rsi))
}