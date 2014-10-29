write.csv(result,file=paste(path,'/chronoJob/report/report.csv',sep=''),row.names=FALSE)
# write.csv(rsiBuy,file=paste(path,'/chronoJob/report/rsiBuy',Sys.Date(),'.csv',sep=''),row.names=FALSE)
# write.csv(rsiSell,file=paste(path,'/chronoJob/report/rsiSell',Sys.Date(),'.csv',sep=''),row.names=FALSE)
# write.csv(bbBuy,file=paste(path,'/chronoJob/report/bbBuy',Sys.Date(),'.csv',sep=''),row.names=FALSE)
# write.csv(bbSell,file=paste(path,'/chronoJob/report/bbSell',Sys.Date(),'.csv',sep=''),row.names=FALSE)
for (i in 1:length(stockId)){
  stock <- paste(stockId[i],'TA',sep='')
  write.csv(get(stock),file=paste(path,'/chronoJob/report/results/',stock,'.csv',sep=''),row.names=index(get(stock)))
}
print('Analysis Complete')