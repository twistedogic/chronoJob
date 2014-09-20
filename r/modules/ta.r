result <- character()
for (i in 1:length(stockId)){
  stock <- stockId[i]
  data <- last(get(stock),n=300)
  CL <- Cl(data)
  HLC <- HLC(data)
  price <- as.vector(last(CL))
  rsi<-as.vector(last(RSI(CL))) #rsi
  sto <- as.vector(last(stoch(HLC, nFastK = 14, nFastD = 3, nSlowD = 3))) #FastK,FastD,SlowD
  smi <- as.vector(last(SMI(HLC, n = 13, nFast = 2, nSlow = 25, nSig = 9))) #smi,smiSignal
  macd <- as.vector(last(MACD(CL, nFast = 12, nSlow = 26, nSig = 9))) #macd,macdSignal
  bbands <- as.vector(last(BBands(HLC))) #Lower,Middle,Upper,ptcB
  result <- rbind(result,c(stock,price,rsi,sto,smi,macd,bbands))
  print(i)
}
ta <- c('symbol','close','rsi','FastK','FastD','SlowD','smi','smiSignal','macd','macdSignal','Lower','Middle','Upper','ptcB')
colnames(result) <- ta
rownames(result) <- stockId