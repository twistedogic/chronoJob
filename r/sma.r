for (i in 1:length(stockId)){
  stock <- stockId[i]
  sma10 <-SMA(Cl(get(stockId[i])),n = 10)
  sma20 <-SMA(Cl(get(stockId[i])),n = 20)
  sma50 <-SMA(Cl(get(stockId[i])),n = 50)
  sma100 <-SMA(Cl(get(stockId[i])),n = 100)
  sma150 <-SMA(Cl(get(stockId[i])),n = 150)
  sma200 <-SMA(Cl(get(stockId[i])),n = 200)
  cross1020 <- sma10 - sma20
  cross1050 <- sma10 - sma50
  cross50150 <- sma50 - sma150
  cross50200 <- sma50 - sma200
  cross100150 <- sma100 - sma150
  cross100200 <- sma100 - sma200
  cross <- rbind(as.vector(last(cross1020,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross1050,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross50150,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross50200,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross100150,n=2)) > 0)
  cross <- rbind(cross,as.vector(last(cross100200,n=2)) > 0)
#   for (j in 1:nrow(cross)){
#     temp <- cross[,j]
#     if 
#   }
}