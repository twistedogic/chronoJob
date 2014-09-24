newstockId <- character()
for (i in 1:length(stockId)){
    if (nrow(get(stockId[i])) > 300){
        #if(last(index(get(stockId[i]))) == as.Date('2014-09-16')){
        total <- nrow(get(stockId[i]))
        active <- as.vector(ROC(Cl(get(stockId[i]))))
        active <- length(active[active==0])
        active <- round(active/total*100)
        price <- last(Cl(get(stockId[i]))
        # HL <- as.vector(last(HLC(get(stockId[i]))))[1] != as.vector(last(HLC(get(stockId[i]))))[2]
        volume <- as.vector(last(get(stockId[i])[,5],n=300))
        volume <- length(volume[volume=='0'])
        if (active < 25 && price > 0 && volume < 50){
            newstockId <- c(newstockId,stockId[i])
        }
        #}
    }
}
stockId <- newstockId
print('Filter Complete')