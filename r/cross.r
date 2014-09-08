library("quantmod")
year <- 2012
ticker1 <- "MSFT"
ticker2 <- "AAPL"
data1 <- getSymbols(ticker1, from = as.Date(paste(year, "-01-01", sep = "")),
to = as.Date(paste(year, "-12-31", sep = "")), auto.assign = FALSE)
data2 <- getSymbols(ticker2, from = as.Date(paste(year, "-01-01", sep = "")),
to = as.Date(paste(year, "-12-31", sep = "")), auto.assign = FALSE)
ret1 <- as.vector(na.omit(ROC(Ad(data1))))
ret2 <- as.vector(na.omit(ROC(Ad(data2))))
cor(ret1, ret2)
ret_min <- min(ret1, ret2)
ret_max <- max(ret1, ret2)
par(mfrow = c(1, 2))
barplot(ret1, main = ticker1, ylim = c(ret_min, ret_max))
barplot(ret2, main = ticker2, ylim = c(ret_min, ret_max))
# plot cross-correlation
plot(ccf(ret1, ret2, plot = FALSE), main = paste("Cross-Correlation", ticker1,
"/", ticker2, year))