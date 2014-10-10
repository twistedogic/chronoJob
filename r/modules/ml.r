library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
test.hex = h2o.importFile(localH2O, path = paste(path,'/report/report.csv',sep=''), key = "test.hex")
test.km = h2o.kmeans(data = test.hex, centers = 2, cols = tatitle)
proto = character();
for(i in 1:length(stockId)){
	stock = stockId[i]
	print(stock)
	stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/results/',stock,'.csv',sep=''), key = "stock.hex")
	train = ceiling(nrow(stock.hex)/2)
	stock.km = h2o.kmeans(data = stock.hex, centers = 2, cols = tatitle[6:46])
	stock.train = stock.hex[index(stock.hex) < train]
	stock.test = stock.hex[index(stock.hex) > train]
	stock.glm = h2o.glm(y = "fclose", x = tatitle[1:47], data = stock.train, family = "gaussian", nfolds = 10, alpha = 0.5)
	stock.fit = h2o.predict(object=stock.glm,newdata=stock.test[,1:47])
	temp = cbind(as.matrix(stock.fit[,1]),as.matrix(stock.test[,48]))
	t = (temp[,1] - temp[,2])*100/temp[,2]
	proto = rbind(proto,mean(t))
}