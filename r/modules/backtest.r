library(PerformanceAnalytics)
# s <- get(stockId[1])
# s$sma20 <- SMA(Cl(s) , 20)
# s$position <- ifelse(Cl(s) > s$sma20 , 1 , -1)
# myReturn <- lag(s$position) * dailyReturn(s)
# charts.PerformanceSummary(cbind(dailyReturn(s),myReturn))

# Step 1: Get the data
stock <- stockId[1]
stock <- paste(stock,'TA',sep='')
data <- get(stock)
data <- na.omit(data)
# Step 2: Create your indicator
price <- data$Close
rsi <- data$rsi
bb <- data$ptcB

# Step 3: Construct your trading rule
sig <- Lag(ifelse(price > 0, 0, -1))
rsib <- Lag(ifelse(rsi <= 35, 1, 0))
rsis <- Lag(ifelse(rsi >= 70, -1, 0))
bbs <- Lag(ifelse(bb >= 1, -1, 0))
bbb <- Lag(ifelse(bb <= 0, 1, 0))
sig <- rsib + rsis + bbs + bbb

# Step 4: The trading rules/equity curve
ret <- data$Close*sig
ret <- ret['2013-06-02/2014-10-20']
eq <- exp(cumsum(ret))
plot(eq)

# Step 5: Evaluate strategy performance
table.Drawdowns(ret, top=10)
table.DownsideRisk(ret)
table.AnnualizedReturns(ret)
charts.PerformanceSummary(ret)