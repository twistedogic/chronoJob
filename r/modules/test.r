start.time <- Sys.time()
library(h2o)
path = getwd()
localH2O = h2o.init(ip = "localhost", port = 54321)
stock <- stockId[1]
stock <- paste(stock,'TA',sep='')
data <- get(stock)
CL <- data[,4]
pos <- character()
for (j in 14:length(CL) - 30){
    end <- j + 30
    temp <- CL[j:end]
    max <- which.max(tmp)
    check <- max + 1 + j
    if(max(temp) < CL[check]){
    	max <- character()
    }
    pos <- c(pos,max)
}
for (j in 1:length(pos)){
	start <- pos[j] - 14
	data[start:j]
}
end.time <- Sys.time()
time.taken <- end.time - start.time
print(time.taken)

