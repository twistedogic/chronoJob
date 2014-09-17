newstockId <- character()
for (i in 1:length(stockId)){
    if (nrow(get(stockId[i])) > 300){
        #if(last(index(get(stockId[i]))) == as.Date('2014-09-16')){
        active <- sum(as.vector(last(ROC(Cl(get(stockId[i])),n=300))),na.rm=TRUE)
        if (active > 0){
            newstockId <- c(newstockId,stockId[i])
        }
        #}
    }
    print(i)
}
stockId <- newstockId