ta <- c('symbol','close','rsi','FastK','FastD','SlowD','smi','smiSignal','macd','macdSignal','Lower','Middle','Upper','ptcB')

for (i in 1:length(stockId)){
    trendResult <- character()
    stock <- stockId[i]
    stock <- rep(stock,times=30)
    data <- last(get(stock),n=300)
    CL <- Cl(data)
    HLC <- HLC(data)
    price <- as.vector(last(CL))
    rsi<-as.vector(last(RSI(CL))) #rsi
    sto <- as.vector(last(stoch(HLC, nFastK = 14, nFastD = 3, nSlowD = 3),n=30)) #FastK,FastD,SlowD
    smi <- as.vector(last(SMI(HLC, n = 13, nFast = 2, nSlow = 25, nSig = 9),n=30)) #smi,smiSignal
    macd <- as.vector(last(MACD(CL, nFast = 12, nSlow = 26, nSig = 9),n=30)) #macd,macdSignal
    bbands <- as.vector(last(BBands(HLC),n=30)) #Lower,Middle,Upper,ptcB
    trendResult <- cbind(trendResult,c(stock,price,rsi,sto,smi,macd,bbands))
    colnames(trendResult) <- ta
}

