start.time <- Sys.time()
library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
proto = character();
for(i in 1:length(stockId)){
    print(i)
	stock = stockId[i]
	train = paste(stock,'TA',sep='')
	stock.hex = h2o.importFile(localH2O, path = paste(path,'/chronoJob/report/results/',train,'.csv',sep=''), key = "stock.hex")
	train = ceiling(nrow(stock.hex)/3*2)
	stock.test = last(stock.hex,n=500)
	stock.train = stock.hex[index(stock.hex) < nrow(stock.hex)]
	tmp = stock
	for(j in 47:51){
	    stock.glm = h2o.glm(y = tdtitle[j], x = c(tatitle[1:4],tatitle[5:length(tatitle)]), data = stock.train, family = "gaussian", nfolds = 10, alpha = 0.5)
	    stock.pred = h2o.predict(object=stock.glm,newdata=stock.test)
	    tmp = cbind(tmp,as.matrix(last(stock.pred)))
	}
	proto = rbind(proto,tmp)
# 	stock.gbm = h2o.gbm(y = "fClose", x = tatitle, distribution = "gaussian", data = stock.train, n.trees = 5, interaction.depth = 3)
# 	stock.pred = h2o.predict(object=stock.gbm,newdata=stock.test)
}
colnames(proto) = c('stock',tdtitle[47:52])
write.csv(proto,file=paste(path,'/chronoJob/report/prediction.csv',sep=''),row.names=FALSE)
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)