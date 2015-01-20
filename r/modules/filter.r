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
print('Filter Complete')
print(length(stockId))