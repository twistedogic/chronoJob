trend <- character()
for (i in 1:length(stockId)){
  stock <- stockId[i]
  data <- last(get(stock),n=300)
  Date <- as.vector(last(row.names(data),n=50))
  CL <- Cl(data)
  HLC <- HLC(data)
  volume <- as.vector(last(data[,5],n=50))
  price <- as.vector(last(HLC,n=50))
  rsi<-as.vector(last(RSI(CL),n=50)) #rsi
  sto <- as.vector(last(stoch(HLC, nFastK = 14, nFastD = 3, nSlowD = 3),n=50)) * 100 #FastK,FastD,SlowD
  smi <- as.vector(last(SMI(HLC, n = 13, nFast = 2, nSlow = 25, nSig = 9),n=50)) #smi,smiSignal
  macd <- as.vector(last(MACD(CL, nFast = 12, nSlow = 26, nSig = 9),n=50)) * 100 #macd,macdSignal
  bbands <- as.vector(last(BBands(HLC),n=50)) #Lower,Middle,Upper,ptcB
  trend <- rbind(trend,c(stock,Date,price,volume,rsi,sto,smi,macd,bbands))
  print(i)
}
ta <- c('symbol','Date','high','low','close','volume','rsi','FastK','FastD','SlowD','smi','smiSignal','macd','macdSignal','Lower','Middle','Upper','ptcB')
colnames(result) <- ta