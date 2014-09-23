result <- character()
for (i in 1:length(stockId)){
  stock <- stockId[i]
  data <- get(stock)
  CL <- Cl(data)
  HLC <- HLC(data)
  rsi <- RSI(CL) #rsi
  sto <- stoch(HLC, nFastK = 14, nFastD = 3, nSlowD = 3) * 100 #FastK,FastD,SlowD
  smi <- SMI(HLC, n = 13, nFast = 2, nSlow = 25, nSig = 9) #smi,smiSignal
  macd <- MACD(CL, nFast = 12, nSlow = 26, nSig = 9) * 100 #macd,macdSignal
  bbands <- BBands(HLC) #Lower,Middle,Upper,ptcB
  data <- cbind(data,rsi,sto,smi,macd,bbands)
  names(data) <- c('Open','High','Low','Close','Volume','Adjusted','rsi','FastK','FastD','SlowD','smi','smiSignal','macd','macdSignal','Lower','Middle','Upper','ptcB')
  assign(stock,data)
  result <- rbind(result,as.vector(last(data)))
  print(i)
}
ta <- c('Open','High','Low','Close','Volume','Adjusted','rsi','FastK','FastD','SlowD','smi','smiSignal','macd','macdSignal','Lower','Middle','Upper','ptcB')
colnames(result) <- ta