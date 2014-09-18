newstockId <- character()
for (i in 1:length(stockId)){
    if (nrow(get(stockId[i])) > 300){
        #if(last(index(get(stockId[i]))) == as.Date('2014-09-16')){
        active <- mean(as.vector(last(ROC(Cl(get(stockId[i])),n=300))),na.rm=TRUE)
        price <- as.vector(last(Cl(get(stockId[i]))))
        HL <- as.vector(last(HLC(get(stockId[i]))))[1] != as.vector(last(HLC(get(stockId[i]))))[2]
        volume <- as.vector(last(get(stockId[i])[,5],n=300))
        volume <- length(volume[volume=='0'])
        if (active > 0 && is.finite(active) && price > 1 && HL && volume < 50){
            newstockId <- c(newstockId,stockId[i])
        }
        #}
    }
}
stockId <- newstockId