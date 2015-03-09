library("quantmod")
library("PerformanceAnalytics")


nameOfStrategy <- "Benchmark Buy & Hold"

#Specify dates for downloading data, training models and running simulation
# trainingStartDate = as.Date("2000-01-01")
# trainingEndDate = as.Date("2010-01-01")
# outofSampleStartDate = as.Date("2010-01-02")

TradingStrategy <- function(stock,mktdata){
  #This is where we define the trading strategy
  #Check moving averages at start of the day and use as the direciton signal
  #Enter trade at the start of the day and exit at the close
  
  #Lets print the name of whats running
  runName <- stock
  print(paste("Running Strategy: ",runName))
  
  #Calculate the Open Close return
  returns <- dailyReturn(mktdata)
  tradingreturns <- returns
  colnames(tradingreturns) <- runName
  
  return (tradingreturns)
}

RunIterativeStrategy <- function(stockId,StartDate,EndDate){
  #This function will run the TradingStrategy
  #It will iterate over a given set of input variables
  #In this case we try lots of different periods for the moving average
  firstRun <- TRUE
  
  for(i in 1:length(stockId)) {
    stock <- stockId[i]
    mktdata <- get(stock)
    mktdata <- window(mktdata, start = StartDate, end = EndDate)
    runResult <- TradingStrategy(stock,mktdata)
    
    if(firstRun){
      firstRun <- FALSE
      results <- runResult
    } else {
      results <- cbind(results,runResult)
    }
  }
  results[is.na(results)] <- 0
  return(results)
}

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

OrderPerformanceTable <- function(performanceTable,metric){
  return (performanceTable[order(performanceTable[,metric],decreasing=TRUE),])
}

SelectTopNStrategies <- function(returns,performanceTable,metric,n){
  #Metric is the name of the function to apply to the column to select the Top N
  #n is the number of strategies to select
  pTab <- OrderPerformanceTable(performanceTable,metric)
  
  if(n > ncol(returns)){
    n <- ncol(returns)
  }
  strategyNames <- rownames(pTab)[1:n]
  topNMetrics <- returns[,strategyNames]
  return (topNMetrics)
}

FindOptimumStrategy <- function(stockId,StartDate,EndDate){
  #Optimise the strategy
  trainingReturns <- RunIterativeStrategy(stockId,StartDate,EndDate)
  pTab <- PerformanceTable(trainingReturns)
  toptrainingReturns <- SelectTopNStrategies(trainingReturns,pTab,"SharpeRatio",10)
  charts.PerformanceSummary(toptrainingReturns,main=paste(nameOfStrategy,"- Training"),geometric=FALSE)
  return (pTab)
}


low <- 9999999
for(i in 1:length(stockId)) {
  cur <- nrow(get(stockId[i]))
  if (cur < low){
    low <- cur
    lowest <- stockId[i]
    StartDate <- as.Date(first(index(get(stockId[i]))))
    EndDate <- as.Date(last(index(get(stockId[i]))))
  }
}
# outofSampleStartDate = as.Date("2010-01-02")
pTab <- FindOptimumStrategy(stockId,StartDate,EndDate) #pTab is the performance table of the various parameters tested
write.csv(na.omit(pTab),file=paste(path,'/chronoJob/benchmark.csv',sep=''))
#Test out of sample
# dev.new()
#Manually specify the parameter that we want to trade here, just because a strategy is at the top of
#pTab it might not be good (maybe due to overfit)
# outOfSampleReturns <- TradingStrategy(testData,mavga_period=9,mavgb_period=6)
# finalReturns <- cbind(outOfSampleReturns,indexReturns)
# charts.PerformanceSummary(finalReturns,main=paste(nameOfStrategy,"- Out of Sample"),geometric=FALSE)
