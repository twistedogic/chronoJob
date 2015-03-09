require("financeR")
require("TTR")
require("xts")
require("fPortfolio")
start.time <- Sys.time()
stock <- stockId[1]
data <- last(get(stock),30)
dataset <- ROC(Cl(data))
timerange <- paste(StartDate,'/',EndDate, sep = '')
for (i in 2:length(stockId)){
    stock <- stockId[i]
    data <- last(get(stock),30)
    dataset <- merge(dataset, ROC(Cl(data)))
}
names(dataset) <- stockId
data <- na.omit(dataset)
scenarios <- dim(data)[1]
assets <- dim(data)[2]
data_ts <- as.timeSeries(data)
spec <- portfolioSpec()
# setSolver(spec) <- "solveRquadprog"
setNFrontierPoints(spec) <- length(stockId)
constraints <- c("LongOnly")
portfolioConstraints(data_ts, spec, constraints)
frontier <- portfolioFrontier(data_ts, spec, constraints)
tailoredFrontierPlot(object = frontier)
# constraints <- c("minW[1:assets]=0", "maxW[1:assets]=0.5")
# newfrontier <- portfolioConstraints(data_ts, spec, constraints)
# tailoredFrontierPlot(object = newfrontier)