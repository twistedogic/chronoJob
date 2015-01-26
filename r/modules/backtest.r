library(PerformanceAnalytics)
# functons
CalculatePerformanceMetric <- function(returns,metric){
  #Get given some returns in columns
  #Apply the function metric to the data
  
  print (paste("Calculating Performance Metric:",metric))
  
  metricFunction <- match.fun(metric)
  metricData <- as.matrix(metricFunction(returns))
  #Some functions return the data the wrong way round
  #Hence cant label columns to need to check and transpose it
  if(nrow(metricData) == 1){
    metricData <- t(metricData)
  }
  colnames(metricData) <- metric
  
  return (metricData)
}



PerformanceTable <- function(returns){
  pMetric <- CalculatePerformanceMetric(returns,"colSums")
  pMetric <- cbind(pMetric,CalculatePerformanceMetric(returns,"SharpeRatio.annualized"))
  pMetric <- cbind(pMetric,CalculatePerformanceMetric(returns,"maxDrawdown"))
  colnames(pMetric) <- c("Profit","SharpeRatio","MaxDrawDown")
  
  print("Performance Table")
  print(pMetric)
  return (pMetric)
}

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
atr <- data$atr
benchmark <- dailyReturn(data)
colnames(benchmark) <- 'benchmark'
###buy and hold = 1
###sell = 0
# Step 3: Construct your trading rule
sig <- Lag(ifelse(price > 0, 0, -1))
rsib <- Lag(ifelse(rsi <= 35, 1, 0))
rsis <- Lag(ifelse(rsi >= 70, -1, 0))
bbs <- Lag(ifelse(bb >= 1, -1, 0))
bbb <- Lag(ifelse(bb <= 0, 1, 0))
sig <- rsib + rsis + bbs + bbb

# long & short
long <- ifelse(sig > 0, 1, 0)
short <- ifelse(sig < 0, -1, 0)
sig <- long + short
stats <- 1
for (i in 1:nrow(sig)){
  if (is.na(sig[i])){
    stats <- stats
  } else {
    if (sig[i] > 0){
      stats <- 1
    }
    if (sig[i] < 0){
      stats <- 0
    }
    stats <- stats
    sig[i] <- stats
  }
}
# Step 4: The trading rules/equity curve
position <- benchmark*sig
colnames(position) <- c('backtest')
ret <- position

# Step 5: Evaluate strategy performance
performance <- PerformanceTable(cbind(benchmark,ret))
charts.PerformanceSummary(cbind(benchmark,ret))