write.csv(buyList,sep=',',file=paste(path,'/report/buyrsi.csv',sep=''))
write.csv(sellList,sep=',',file=paste(path,'/report/sellrsi.csv',sep=''))
write.csv(smaBuyList,sep=',',file=paste(path,'/report/buysma.csv',sep=''))
write.csv(smaSellList,sep=',',file=paste(path,'/report/sellsma.csv',sep=''))
write.csv(allRSI,sep=',',file=paste(path,'/report/allrsi.csv',sep=''))
print('Analysis Complete')