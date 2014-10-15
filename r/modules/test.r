start.time <- Sys.time()
library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
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
    if(max(temp) < CL[check]){
    	max <- character()
    }
    maxpos <- max + j
    pos <- c(pos,maxpos)
}
# pos <- unique(pos)
for (j in 1:length(pos)){
	start <- pos[j] - 14
	temp <- data[start:j]
    row <- character()
    for(k in 1:nrow(temp)){
        row <- c(row, as.vector(temp[k]))
    }
    sample <- rbind(sample,row)
}
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)

