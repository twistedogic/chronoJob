for(i in 1:length(stockId)){
	stock <- stockId[i]
	train <- paste(stock,'TA',sep='')
	data <- get(train)
	fdata <- get(stock)
	o <- as.vector(tail(fdata[,1],-1))
	h <- as.vector(tail(fdata[,2],-1))
	l <- as.vector(tail(fdata[,3],-1))
	c <- as.vector(tail(fdata[,4],-1))
	v <- as.vector(tail(fdata[,5],-1))
	change <- as.vector(tail(data[,6],-1))
	o <- c(o,NA)
	h <- c(h,NA)
	l <- c(l,NA)
	c <- c(c,NA)
	v <- c(v,NA)
	change <- c(change,NA)
	tdtitle <- c(tatitle,'fO','fH','fL','fC','fV','fChange')
	traindata <- cbind(data,o,h,l,c,v,change)
	colnames(traindata) <- tdtitle
	traindata <- tail(traindata,-251)
	assign(train,traindata)
}