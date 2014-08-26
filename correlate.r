library("quantmod")
ticker <- "MSFT"
data <- getSymbols(ticker, from = as.Date("2012-01-01"), to = as.Date("2012-12-31"),auto.assign = FALSE)
ret <- as.vector(na.omit(ROC(Ad(data))))
barplot(ret, main = paste("Daily returns", ticker))
ret0 <- ret[-length(ret)]  # r(t-1)
ret1 <- ret[-1]  # r(t)
print(cor(ret0, ret1))
res <- lm(ret1 ~ ret0)
summary(res)
beta0 <- res$coefficients[[1]]
beta1 <- res$coefficients[[2]]
plot(ret0, ret1, xlab = "r(t-1)", ylab = "r(t)", main = ticker)
abline(beta0, beta1)
plot(acf(ret, plot = FALSE), main = paste("Auto-Correlation", ticker))