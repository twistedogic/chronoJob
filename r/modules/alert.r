rsiBuy <- character()
rsiSell <- character()
bbBuy <- character()
bbSell <- character()
#Basic
for (i in 1:nrow(result)){
  data <- result[i,]
  symbol <- data['Symbol']
  price <- data['Close']
  rsi <- data['rsi']
  bb <- data['ptcB']
  if (rsi <= 35){
    rsiBuy <- rbind(rsiBuy,c(symbol,price,rsi))
  }
  if (rsi >= 70){
    rsiSell <- rbind(rsiSell,c(symbol,price,rsi))
  }
  if (bb >= 1){
    bbSell <- rbind(bbSell,c(symbol,price,bb))
  }
  if (bb <= 0){
    bbBuy <- rbind(bbBuy,c(symbol,price,bb))
  }
}