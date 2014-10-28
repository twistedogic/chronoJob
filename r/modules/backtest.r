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
perf <- data$change
price <- data$Close
rsi <- data$rsi
bb <- data$ptcB

###buy and hold = 1
###sell = 0
# Step 3: Construct your trading rule
sig <- Lag(ifelse(price > 0, 0, -1))
rsib <- Lag(ifelse(rsi <= 35, 1, 0))
rsis <- Lag(ifelse(rsi >= 70, -1, 0))
bbs <- Lag(ifelse(bb >= 1, -1, 0))
bbb <- Lag(ifelse(bb <= 0, 1, 0))
sig <- rsib + rsis + bbs + bbb
long <- Lag(ifelse(sig > 0, 1, 0))
short <- Lag(ifelse(sig < 0, -1, 0))
sig <- long + short
# Step 4: The trading rules/equity curve
position <- price*sig
bud <- 200
ret <- position
for(i in 1:length(position)){
  if(is.na(position[i])){
    ret[i] <- position[i]
  } else {
    bud <- bud - as.numeric(position[i])
    ret[i] <- bud
  }
}
ret <- ret['2013-06-02/2014-10-20']
pre <- 0
for(i in 1:length(ret)){
  if(i < 2){
    ret[i] <- 0
  } else {
    now <- as.numeric(ret[i])
    ret[i] <- (pre/now)
    pre <- as.numeric(ret[i])
  }
}

benchmark <- dailyReturn(data)
benchmark <- benchmark['2013-06-02/2014-10-20']
eq <- exp(cumsum(ret))
plot(eq)

# Step 5: Evaluate strategy performance
table.Drawdowns(ret, top=10)
table.DownsideRisk(cbind(benchmark,ret))
table.AnnualizedReturns(ret)
charts.PerformanceSummary(cbind(benchmark,ret))