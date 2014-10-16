start.time <- Sys.time()
library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
interval = 14
stock <- stockId[1]
stock <- paste(stock,'TA',sep='')
data <- get(stock)
CL <- data[,4]
sample <- character()
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
    row <- character()
    for(k in 1:nrow(temp)){
        row <- c(row, as.vector(temp[k])[1:46])
    }
    sample <- rbind(sample,row)
}
colnames(sample) <- make.names(rep(tatitle,times=interval + 1),unique=TRUE)
write.csv(sample,file=paste(path,'/report/sample.csv',sep=''),row.names=FALSE)
stock.hex = h2o.importFile(localH2O, path = paste(path,'/report/sample.csv',sep=''), key = "stock.hex")
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)

