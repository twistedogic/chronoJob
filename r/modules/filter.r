newstockId <- character()
filtered <- character()
for (i in 1:length(stockId)){
    if (nrow(get(stockId[i])) > 1000){
        #if(last(index(get(stockId[i]))) == as.Date('2014-09-16')){
        total <- 900
        data <- get(stockId[i])
        active <- as.vector(last(ROC(Cl(data)),n=total))
        inactive <- length(active[active==0])
        active <- round(inactive/total*100)
        price <- last(Cl(get(stockId[i])))
        #HL <- as.vector(last(HLC(get(stockId[i]))))[1] != as.vector(last(HLC(get(stockId[i]))))[2]
        if (active < 25){
            newstockId <- c(newstockId,stockId[i])
        }
    }
}
stockId <- newstockId
print('Filter Complete')
print(length(stockId))