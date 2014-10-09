library(h2o)
localH2O = h2o.init(ip = "localhost", port = 54321)
test.hex = h2o.importFile(localH2O, path = 'report/report.csv', key = "test.hex")
test.km = h2o.kmeans(data = test.hex, centers = 5, cols = tatitle)