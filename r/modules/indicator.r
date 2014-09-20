'close','rsi','sto','smi','macd','bbands'
for (i in 1:nrow(result)){
	data <- result[i,]
	symbol <- data[1]
	close <- data[2]
	rsi <- data[3]
	FastK <- data[4] *	100
	FastD <- data[5] *	100
	SlowD <- data[6] *	100
	smi <- data[7]
	smiSignal <- data[8]
	macd <- data[9]
	macdSignal <- data[10]
	macdHist <- macd - macdSignal 
	Lower <- data[11]
	Middle <- data[12]
	Upper <- data[13]
	ptcB <- data[14]
	if(rsi <= 35){
	    rsi <- 
	}
}