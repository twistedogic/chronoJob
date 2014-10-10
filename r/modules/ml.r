library(h2o)
localH2O = h2o.init(ip = "localhost", port = 54321)
test.hex = h2o.importFile(localH2O, path = 'report/report.csv', key = "test.hex")
stock.hex = h2o.importFile(localH2O, path = 'report/results/0001.HK.csv', key = "stock.hex")
test.km = h2o.kmeans(data = test.hex, centers = 2, cols = tatitle)
stock.km = h2o.kmeans(data = stock.hex, centers = 2, cols = tatitle[6:46])
stock.train = stock.hex[1:3000]
stock.test = stock.hex[3001:nrow(stock.hex)]
stock.glm = h2o.glm(y = "Close", x = tatitle[6:46], data = stock.train, family = "gaussian", nfolds = 10, alpha = 0.5)
stock.fit = h2o.predict(object=stock.glm,newdata=stock.test)
proto <- cbind(as.matrix(stock.fit[,1]),as.matrix(stock.test[,5]))