rm(list=ls())
path <- getwd()
source('chronoJob/r/modules/ETL.r')
source('chronoJob/r/modules/benchmark.r')
df <- read.csv('chronoJob/node/dataset/fundamentals.csv')
df <- df[,colSums(is.na(df)) == 0]
df$trading_currency <- NULL
df$par_currency <- NULL
id <- unlist(strsplit(as.character(df$symbol[1]),':'))[1]
symbol <- paste(substring(id,2),'.HK',sep = '')
for (i in 2:length(df$symbol)){
  id <- unlist(strsplit(as.character(df$symbol[i]),':'))[1]
  symbol <- c(symbol,paste(substring(id,2),'.HK',sep = ''))
}
df$symbol <- symbol
df <- df[with(df,order(df$symbol)),]
pTab <- data.frame(pTab)
rownames(pTab) <- NULL
companyinfo <- cbind(df,pTab)
write.csv(companyinfo,file=paste(path,'/chronoJob/companyinfo.csv',sep=''), row.names=FALSE)