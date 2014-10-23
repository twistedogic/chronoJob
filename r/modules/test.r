start.time <- Sys.time()
interval = 30
period = 50
stock <- stockId[1]
stock <- paste(stock,'TA',sep='')
data <- get(stock)
CL <- data[,4]
kmsample <- character()
glmsample <- character()
hpos <- character()
for (j in interval:(length(CL) - period)){
    end <- j + period
    temp <- CL[j:end]
    max <- which.max(temp)
    check <- max + j
    if(max(temp) > CL[check]){
        maxpos <- max + j -1
        hpos <- c(hpos,maxpos)
    }
}
hpos <- unique(hpos)
lpos <- character()
for (j in interval:(length(CL) - period)){
    end <- j + period
    temp <- CL[j:end]
    min <- which.min(temp)
    check <- min + j
    if(min(temp) > CL[check]){
        minpos <- min + j -1
        lpos <- c(lpos,minpos)
    }
}
lpos <- unique(lpos)

# path = getwd()
# localH2O = h2o.init(ip = "localhost", port = 54321)
# dateMax <- character()
# maxClose <- character()
# for (j in 1:10){
# # for (j in 1:length(pos)){
#     dateMax <- rbind(dateMax,index(data[j]))
#     maxClose <- c(maxClose,data[,4])
#     end <- as.integer(pos[j])
#     start <- end - interval
# 	temp <- data[start:end]
# 	write.csv(temp,file=paste(path,'/report/temp.csv',sep=''),row.names=FALSE)
# 	stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/temp.csv',sep=''), key = "stock.hex")
# 	stock.glm <- h2o.glm(y = tdtitle[7], x = c(tatitle[8:length(tatitle)]), data = stock.hex, family = "gaussian", nfolds = 10, alpha = 0.5)
# 	glmtemp <- as.matrix(stock.glm@model$coefficients)
# 	glmcolname <- rownames(glmtemp)
# 	glmtemp <- as.vector(glmtemp)
#     row <- character()
#     for(k in 1:nrow(temp)){
#         row <- c(row, as.vector(temp[k])[1:46])
#     }
#     kmsample <- rbind(kmsample,row)
#     glmsample <- rbind(glmsample,glmtemp)
# }
# colnames(glmsample) <- glmcolname
# rownames(glmsample) <- pos[1:j]
# colnames(kmsample) <- make.unique(rep(tatitle,times=interval+1),sep='')
# write.csv(glmsample,file=paste(path,'/report/glmsample.csv',sep=''),row.names=FALSE)
# write.csv(kmsample,file=paste(path,'/report/kmsample.csv',sep=''),row.names=FALSE)
# stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/kmsample.csv',sep=''), key = "stock.hex")
# stock.km = h2o.kmeans(data = stock.hex, centers = 5, cols = colnames(kmsample))
# stock.kmpred = h2o.predict(stock.km,stock.hex)
# trainName <- make.unique(rep(tatitle[4],times=interval+1),sep='')
# stock.glm <- h2o.glm(y = trainName[length(trainName)], x = trainName[1:length(trainName)-1], data = stock.hex, family = "gaussian", nfolds = 10, alpha = 0.5)
# # stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/glmsample.csv',sep=''), key = "stock.hex")
# # stock.km = h2o.kmeans(data = stock.hex, centers = 5, cols = colnames(glmsample))
# # stock.glmpred = h2o.predict(stock.km,stock.hex)
# result <- cbind(dateMax,maxClose,as.matrix(stock.kmpred))
# colnames(result) <- c('Date','Close','KM','GLM')
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)

