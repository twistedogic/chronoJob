result <- character()
maxminResult <- character()
print('Analyzing...')
for (i in 1:length(stockId)){
  stock <- stockId[i]
  data <- get(stock)
  tatitle <- c('Open','High','Low','Close','Volume','Adjusted')
  CL <- Cl(data)
  HLC <- HLC(data)
  HL <- data[,c(2,3)]
  V <- data[,5]
  change <- ROC(CL) #change
  tatitle <- c(tatitle,c('change'))
  rsi <- RSI(CL) #rsi
  tatitle <- c(tatitle,c('rsi'))
  sto <- stoch(HLC, nFastK = 14, nFastD = 3, nSlowD = 3, maType = 'EMA') * 100 #FastK,FastD,SlowD
  tatitle <- c(tatitle,names(sto))
  smi <- SMI(HLC, n = 13, nFast = 2, nSlow = 25, nSig = 9) #smi,smiSignal
  tatitle <- c(tatitle,c('smi','smiSignal'))
  macd <- MACD(CL, nFast = 12, nSlow = 26, nSig = 9) * 100 #macd,macdSignal
  tatitle <- c(tatitle,c('macd','macdSignal'))
  bbands <- BBands(HLC) #Lower,Middle,Upper,ptcB
  tatitle <- c(tatitle,c('Lower','Middle','Upper','ptcB'))
  atr <- ATR(HLC)
  tatitle <- c(tatitle,names(atr))
  cV <- chaikinVolatility(HL)
  tatitle <- c(tatitle,c('cV'))
  tdi <- TDI(CL)
  tatitle <- c(tatitle,names(tdi))
  adx <- ADX(HLC)
  tatitle <- c(tatitle,names(adx))
  mfi <- MFI(HLC,V)
  tatitle <- c(tatitle,names(mfi))
  obv <- OBV(CL,V)
  tatitle <- c(tatitle,names(obv))
  sar <- SAR(HL)
  tatitle <- c(tatitle,c('sar'))
  sma10 <-SMA(CL,n = 10)
  tatitle <- c(tatitle,c('sma10'))
  sma20 <-SMA(CL,n = 20)
  tatitle <- c(tatitle,c('sma20'))
  sma50 <-SMA(CL,n = 50)
  tatitle <- c(tatitle,c('sma50'))
  sma100 <-SMA(CL,n = 100)
  tatitle <- c(tatitle,c('sma100'))
  sma150 <-SMA(CL,n = 150)
  tatitle <- c(tatitle,c('sma150'))
  sma250 <-SMA(CL,n = 250)
  tatitle <- c(tatitle,c('sma250'))
  roc5 <-SMA(change,n = 5)
  tatitle <- c(tatitle,c('roc5'))
  roc10 <-SMA(change,n = 10)
  tatitle <- c(tatitle,c('roc10'))
  roc20 <-SMA(change,n = 20)
  tatitle <- c(tatitle,c('roc20'))
  roc50 <-SMA(change,n = 50)
  tatitle <- c(tatitle,c('roc50'))
  roc100 <-SMA(change,n = 100)
  tatitle <- c(tatitle,c('roc100'))
  roc150 <-SMA(change,n = 150)
  tatitle <- c(tatitle,c('roc150'))
  roc250 <-SMA(change,n = 250)
  tatitle <- c(tatitle,c('roc250'))
  data <- cbind(data,change,rsi,sto,smi,macd,bbands,atr,cV,tdi,adx,mfi,obv,sar,sma10,sma20,sma50,sma100,sma150,sma250,roc5,roc10,roc20,roc50,roc100,roc150,roc250)
  colnames(data) <- tatitle
  #data <- last(data,n=700)
  data <- last(data,n=nrow(data)-251)
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
tatitle <- c(tatitle,'max250','min250','mean250','max100','min100','mean100','max50','min50','mean50')
ta <- c('Symbol',tatitle)
result <- cbind(result,maxminResult)
colnames(result) <- ta
