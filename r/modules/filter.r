newstockId <- character()
for (i in 1:length(stockId)){
    active <- sum(as.vector(last(ROC(Cl(get(stockId[i])),n=365)),na.rm=TRUE)
    if (nrow(na.omit(get(stockId[i]))) > 300){
        #if(last(index(get(stockId[i]))) == as.Date('2014-09-16')){
        if(active > 0){
            newstockId <- c(newstockId,stockId[i])
        }
        #}
    }
}
stockId <- newstockId