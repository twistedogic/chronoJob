write.csv(result,file=paste(path,'/report/report.csv',sep=''),row.names=FALSE)
# write.csv(rsiBuy,file=paste(path,'/report/rsiBuy',Sys.Date(),'.csv',sep=''),row.names=FALSE)
# write.csv(rsiSell,file=paste(path,'/report/rsiSell',Sys.Date(),'.csv',sep=''),row.names=FALSE)
# write.csv(bbBuy,file=paste(path,'/report/bbBuy',Sys.Date(),'.csv',sep=''),row.names=FALSE)
# write.csv(bbSell,file=paste(path,'/report/bbSell',Sys.Date(),'.csv',sep=''),row.names=FALSE)
for (i in 1:length(stockId)){
	stock <- paste(stockId[i],'TA',sep='')
	write.csv(get(stock),file=paste(path,'/report/results/',stock,'.csv',sep=''),row.names=index(get(stock)))
}
for (i in 1:length(stockId)){
	stock <- paste(stockId[i],'indicator',sep='')
	write.csv(get(stock),file=paste(path,'/report/indicators/',stock,'.csv',sep=''),row.names=FALSE)
}
print('Analysis Complete')