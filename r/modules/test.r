start.time <- Sys.time()
library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
interval = 14
stock <- stockId[1]
stock <- paste(stock,'TA',sep='')
data <- get(stock)
CL <- data[,4]
kmsample <- character()
glmsample <- character()
pos <- character()
for (j in 14:(length(CL)-30)){
    end <- j + 30
    temp <- CL[j:end]
    max <- which.max(temp)
    check <- max + 1 + j
    if(max(temp) > CL[check]){
        maxpos <- max + j
        pos <- c(pos,maxpos)
    }
}
pos <- unique(pos)
for (j in 1:length(pos)){
    end <- as.integer(pos[j])
    start <- end - interval
	temp <- data[start:end]
	write.csv(temp,file=paste(path,'/report/temp.csv',sep=''),row.names=FALSE)
	stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/temp.csv',sep=''), key = "stock.hex")
	stock.glm <- h2o.glm(y = tdtitle[50], x = c(tatitle[1:4],tatitle[5:length(tatitle)]), data = stock.hex, family = "gaussian", nfolds = 10, alpha = 0.5)
	glmtemp <- as.matrix(stock.glm@model$coefficients)
	glmcolname <- rownames(glmtemp)
	glmtemp <- as.vector(glmtemp)
    row <- character()
    for(k in 1:nrow(temp)){
        row <- c(row, as.vector(temp[k])[1:46])
    }
    kmsample <- rbind(kmsample,row)
    glmsample <- rbind(glmsample,glmtemp)
}
colnames(glmsample) <- glmcolname
rownames(glmsample) <- pos[1:j]
colnames(kmsample) <- make.names(rep(tatitle,times=interval + 1),unique=TRUE)
write.csv(kmsample,file=paste(path,'/report/sample.csv',sep=''),row.names=FALSE)
stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/sample.csv',sep=''), key = "stock.hex")
stock.km = h2o.kmeans(data = stock.hex, centers = 5, cols = colnames(kmsample))
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)

