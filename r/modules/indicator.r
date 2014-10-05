for(i in 1:length(stockId)){
	stock <- stockId[i]
	indicator <- paste(stock,'indicator',sep='')
	data <- get(stock)
	change <- data[,'change'] > 0
	rsib <- data[,'rsi'] <= 35
	rsis <- data[,'rsi'] >= 70
	bbb <- data[,'ptcB'] <= 0
	bbs <- data[,'ptcB'] >= 1
	roc <- data[,'roc10'] > 0
	data <- cbind(change,rsib,rsis,bbb,bbs,roc) * 1
	assign(indicator,data)
}