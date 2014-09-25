rm(list=ls())
start.time <- Sys.time()
path <- paste(getwd())
#path <- paste(getwd(),'/chronoJob',sep='')
if (require('quantmod') == FALSE){
    source(paste(path,'/r/modules/init.r',sep=''))
}
source(paste(path,'/r/modules/ETL.r',sep=''))
source(paste(path,'/r/modules/filter.r',sep=''))
source(paste(path,'/r/modules/ta.r',sep=''))
source(paste(path,'/r/modules/export.r',sep=''))
performance <- character()
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)