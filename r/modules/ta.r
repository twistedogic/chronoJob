result <- character()
maxminResult <- character()
print('Analyzing...')
title <- c('Open','High','Low','Close','Volume','Adjusted','change','rsi','FastK','FastD','SlowD','smi','smiSignal','macd','macdSignal','Lower','Middle','Upper','ptcB','sma10','sma20','sma50','sma100','sma150','sma250')
for (i in 1:length(stockId)){
  stock <- stockId[i]
  data <- get(stock)
  CL <- Cl(data)
  HLC <- HLC(data)
  change <- ROC(CL) #change
  rsi <- RSI(CL) #rsi
  sto <- stoch(HLC, nFastK = 14, nFastD = 3, nSlowD = 3, maType = 'EMA') * 100 #FastK,FastD,SlowD
  smi <- SMI(HLC, n = 13, nFast = 2, nSlow = 25, nSig = 9) #smi,smiSignal
  macd <- MACD(CL, nFast = 12, nSlow = 26, nSig = 9) * 100 #macd,macdSignal
  bbands <- BBands(HLC) #Lower,Middle,Upper,ptcB
  sma10 <-SMA(CL,n = 10)
  sma20 <-SMA(CL,n = 20)
  sma50 <-SMA(CL,n = 50)
  sma100 <-SMA(CL,n = 100)
  sma150 <-SMA(CL,n = 150)
  sma250 <-SMA(CL,n = 250)
  data <- cbind(data,change,rsi,sto,smi,macd,bbands,sma10,sma20,sma50,sma100,sma150,sma250)
  names(data) <- title
  assign(stock,data)
  day <- c(250,100,50)
  maxmin <- character()
  for (j in day){
    data <- last(data,n=j)
    maxmin <- cbind(maxmin,as.vector(max(data[,2])),as.vector(min(data[,3])),as.vector(mean(data[,4])))
  }
  maxminResult <- rbind(maxminResult,maxmin)
  result <- rbind(result,c(stock,as.vector(last(data))))
}
colnames(maxminResult) <- c('250max','250min','250mean','100max','100min','100mean','50max','50min','50mean')
ta <- c('Symbol',title)
colnames(result) <- ta
result <- cbind(result,maxminResult)

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
colnames(rsiBuy)<-c('symbol','price','rsi')
colnames(rsiSell)<-c('symbol','price','rsi')
colnames(bbBuy)<-c('symbol','price','%B')
colnames(bbSell)<-c('symbol','price','%B')