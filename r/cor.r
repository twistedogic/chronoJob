corTable <- matrix(nrow=length(stockId),ncol=length(stockId))
colnames(corTable) <- stockId
rownames(corTable) <- stockId
for (i in 1:length(stockId)){
    print(i)
    for (j in 1:length(stockId)){
        if(i <= j){
            ret1 <- as.vector(rev(na.omit(ROC(Cl(get(stockId[i]))))))
            ret2 <- as.vector(rev(na.omit(ROC(Cl(get(stockId[j]))))))
            if (length(ret1) > length(ret2)){
                ret1 <- head(ret1,n=length(ret2))
            } else {
                ret2 <- head(ret2,n=length(ret1))
            }
            corTable[i,j] <- cor(ret1,ret2)
        }
    }
}
path <- getwd()
write.csv(corTable,sep=',',file=paste(path,'/report/correlation.csv',sep=''))