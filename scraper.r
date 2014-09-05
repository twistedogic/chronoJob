library(quantmod)
library(lubridate)
library(TTR)
library(rredis)
# parameters
stockId <- c("6823.HK","0001.HK","0008.HK")
endDate <- Sys.Date()
d <- day(endDate)
m <- month(endDate)
y <- year(endDate) - 2
startDate <- paste(y,m,d,sep="-")
startDate <- as.Date(startDate)
getSymbols(stockId,from = startDate, to = endDate)
for (i in 2:length(stockId)){
  stock <- stockId[i]
  rsi<-RSI(Cl(get(stockId[i])),n = 14,maType='SMA') 
  rsiBuy <- last(rsi) <= 35
  rsiSell <- last(rsi) >= 70
}

for (i in 2:length(stockId)){
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
  cross50250 <- sma50 - sma250
  cross100150 <- sma100 - sma150
  cross100250 <- sma100 - sma250

}