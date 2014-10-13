library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
test.hex = h2o.importFile(localH2O, path = paste(path,'/report/report.csv',sep=''), key = "test.hex")
test.km = h2o.kmeans(data = test.hex, centers = 2, cols = tatitle)
proto = character();
for(i in 1:length(stockId)){
	stock = stockId[i]
	train = paste(stock,'TA',sep='')
	stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/results/',train,'.csv',sep=''), key = "stock.hex")
	train = ceiling(nrow(stock.hex)/3*2)
	stock.km = h2o.kmeans(data = stock.hex, centers = 2, cols = tdtitle[2:46])
	stock.train = stock.hex[index(stock.hex) <= train,]
	stock.test = stock.hex[index(stock.hex) > train,]
	tmp = stock
	for(j in 47:51){
	    stock.glm = h2o.glm(y = tdtitle[j], x = tatitle, data = stock.train, family = "gaussian", nfolds = 10, alpha = 0.5)
	    stock.pred = h2o.predict(object=stock.glm,newdata=stock.test)
	    tmp = cbind(tmp,as.matrix(last(stock.pred)))
	}
	proto = rbind(proto,tmp)
# 	stock.gbm = h2o.gbm(y = "fClose", x = tatitle, distribution = "gaussian", data = stock.train, n.trees = 5, interaction.depth = 3)
# 	stock.pred = h2o.predict(object=stock.gbm,newdata=stock.test)
}
colnames(proto) = c('stock',tdtitle[47:51])
write.csv(proto,file=paste(path,'/report/prediction.csv',sep=''),row.names=FALSE)