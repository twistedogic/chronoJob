newstockId <- character()
filtered <- character()
for (i in 1:length(stockId)){
    if (nrow(na.omit(get(stockId[i]))) > 500){
      newstockId <- c(newstockId,stockId[i])
    }
}
stockId <- newstockId
print('Filter Complete')
print(length(stockId))