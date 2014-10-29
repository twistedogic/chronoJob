rm(list=ls())
start.time <- Sys.time()
path <- paste(getwd())
if (require('quantmod') == FALSE){
  source(paste(path,'/chronoJob/r/modules/init.r',sep=''))
}
source(paste(path,'/chronoJob/r/modules/ETL.r',sep=''))
source(paste(path,'/chronoJob/r/modules/filter.r',sep=''))
source(paste(path,'/chronoJob/r/modules/ta.r',sep=''))
source(paste(path,'/chronoJob/r/modules/traindata.r',sep=''))
source(paste(path,'/chronoJob/r/modules/export.r',sep=''))
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)