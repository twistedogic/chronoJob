library(quantmod)
library(lubridate)
library(TTR)
# parameters
stockId <- c("6823.HK","0001.HK","0008.HK")
endDate <- Sys.Date()
d <- day(endDate)
m <- month(endDate)
y <- year(endDate) - 3
startDate <- paste(y,m,d,sep="-")
startDate <- as.Date(startDate)
tickers <- getSymbols(stockId, from = startDate, to = endDate, auto.assign = TRUE)
dataset <- get(tickers[1])
for (i in 2:length(tickers)) {
    dataset <- merge(dataset, get(tickers[i]))
}
# handle NA values (four common alternatives)
data_omit <- na.omit(dataset)  # omit values with NA values
data_locf <- na.locf(dataset)  # last observation carried forward
data_approx <- na.approx(dataset)  # linear approximation
data_spline <- na.spline(dataset)  # cubic spline interpolation
return_lag <- 5  # (crude) weekly returns
data <- na.omit(ROC(data_spline, return_lag, type = "discrete"))
names(data) <- stockId
save(data, file = "proto.rda")