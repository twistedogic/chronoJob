newstockId <- character()
filtered <- character()
for (i in 1:length(stockId)){
  checkNull <- as.numeric(Cl(get(stockId[i])))
    if (length(na.omit(checkNull)) > 200){
      print(stockId[i])
      newstockId <- c(newstockId,stockId[i])
    }
}
stockId <- newstockId
for (i in 1:length(stockId)){
  data <- get(stockId[i])
  cName <- colnames(data)
  newData <- cbind(as.numeric(data[,1]),as.numeric(data[,2]),as.numeric(data[,3]),as.numeric(data[,4]),as.numeric(data[,5]))
  colnames(newData) <- cName
  newData <- xts(newData,order.by = index(data))
  newData <- na.omit(newData)
  assign(stockId[i],newData)
}
print('Filter Complete')
print(length(stockId))