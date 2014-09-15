smaBuyList <- character()
smaSellList <- character()
for (i in 1:length(stockId)){
  stock <- stockId[i]
  closePrice <- Cl(get(stock))
  sma10 <-SMA(closePrice,n = 10)
  sma20 <-SMA(closePrice,n = 20)
  sma50 <-SMA(closePrice,n = 50)
  sma100 <-SMA(closePrice,n = 100)
  sma150 <-SMA(closePrice,n = 150)
  sma250 <-SMA(closePrice,n = 250)
  cross1020 <- sma10 - sma20
  cross1050 <- sma10 - sma50
  cross50150 <- sma50 - sma150
  cross50250 <- sma50 - sma250
  cross100150 <- sma100 - sma150
  cross100250 <- sma100 - sma250
  cross <- rbind(as.vector(last(cross1020,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross1050,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross50150,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross50250,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross100150,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross100250,n=2)) > 0)
  crossOver <- c('1020','1050','50150','50250','100150','100250')
  for (j in 1:nrow(cross)){
    if (cross[j,][1] != cross[j,][2]){
        if (cross[j,][1]){
            alert <- c(stock,crossOver[j],'-1')
            smaSellList <- rbind(smaSellList,alert)
        } else {
            alert <- c(stock,crossOver[j],'1')
            smaBuyList <- rbind(smaBuyList,alert)
        }
    }
  }
}