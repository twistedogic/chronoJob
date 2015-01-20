library('httr')
library('rjson')
updateData <- function(symbol,stockId) {
    url <- 'http://
}
for (i in 1:length(stockId)){
  stock <- paste(stockId[i],'TA',sep='')
  updateData(stockId[i],get(stock))
}
print('Analysis Complete')