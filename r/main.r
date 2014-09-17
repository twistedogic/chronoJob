path <- getwd()
if (require('quantmod') == FALSE){
    source(paste(path,'/r/init.r',sep=''))
}
source(paste(path,'/r/ETL.r',sep=''))
source(paste(path,'/r/filter.r',sep=''))
source(paste(path,'/r/rsi.r',sep=''))
source(paste(path,'/r/sma.r',sep=''))
source(paste(path,'/r/export.r',sep=''))
performance <- character()