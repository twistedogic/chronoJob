library("quantmod")
library("financeR")
library("xts")
library("tseries")
library("fPortfolio")
library("TTR")

DJIA201212 <- c("AA", "AXP", "BA", "BAC", "CAT", "CSCO", "CVX", "DD", "DIS",
"GE", "HD", "HPQ", "IBM", "INTC", "JNJ", "JPM", "KO", "MCD", "MMM", "MRK",
"MSFT", "PFE", "PG", "T", "TRV", "UNH", "UTX", "VZ", "WMT", "XOM")
stocks <- DJIA201212
date_begin <- as.Date("2012-01-01")
date_end <- as.Date("2012-12-31")
tickers <- getSymbols(stocks, from = date_begin, to = date_end, auto.assign = TRUE)
dataset <- Ad(get(tickers[1]))
for (i in 2:length(tickers)) {
dataset <- merge(dataset, Ad(get(tickers[i])))
}
# handle NA values (four common alternatives)
data_omit <- na.omit(dataset)  # omit values with NA values
data_locf <- na.locf(dataset)  # last observation carried forward
data_approx <- na.approx(dataset)  # linear approximation
data_spline <- na.spline(dataset)  # cubic spline interpolation
return_lag <- 5  # (crude) weekly returns
data <- na.omit(ROC(data_spline, return_lag, type = "discrete"))
names(data) <- stocks
save(data, file = "djia2012w.rda")

data(djia2012w)
names(data)
scenarios <- dim(data)[1]
assets <- dim(data)[2]

result <- portfolio.optim(data)
portfolio <- result$pw
print(portfolio)
prec <- 6
portfolio <- round(portfolio, prec)
print(portfolio)
pie_labels <- names(data)
pie_labels[which(portfolio == 0)] <- NA
pie(portfolio, labels = pie_labels, col = rainbow(assets))

data_ts <- as.timeSeries(data)
spec <- portfolioSpec()
setSolver(spec) <- "solveRquadprog"
setNFrontierPoints(spec) <- 20
constraints <- c("LongOnly")
portfolioConstraints(data_ts, spec, constraints)
frontier <- portfolioFrontier(data_ts, spec, constraints)
print(frontier)
tailoredFrontierPlot(object = frontier)
weightsPlot(frontier, col = rainbow(assets))
constraints <- c("minW[1:assets]=0", "maxW[1:assets]=0.5")
portfolioConstraints(data_ts, spec, constraints)
frontier <- portfolioFrontier(data_ts, spec, constraints)
tailoredFrontierPlot(object = frontier)
weightsPlot(frontier, col = rainbow(assets))