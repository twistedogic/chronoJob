newstockId <- character()
for (i in 1:length(stockId)){
    if (nrow(get(stockId[i])) > 300){
        newstockId <- c(newstockId,stockId[i])
    }
}
stockId <- newstockId