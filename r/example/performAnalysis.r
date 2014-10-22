library(quantmod)
library(PerformanceAnalytics)
s <- get(getSymbols('0001.HK'))["2012::"]
s$sma20 <- SMA(Cl(s) , 20)
s$position <- ifelse(Cl(s) > s$sma20 , 1 , -1)
myReturn <- lag(s$position) * dailyReturn(s)
charts.PerformanceSummary(cbind(dailyReturn(s),myReturn))

# # Step 1: Get the data
# getSymbols("^GSPC")

# # Step 2: Create your indicator
# dvi <- DVI(Cl(GSPC))

# # Step 3: Construct your trading rule
# sig <- Lag(ifelse(dvi$dvi < 0.5, 1, -1))

# # Step 4: The trading rules/equity curve
# ret <- ROC(Cl(GSPC))*sig
# ret <- ret['2009-06-02/2010-09-07']
# eq <- exp(cumsum(ret))
# plot(eq)

# # Step 5: Evaluate strategy performance
# table.Drawdowns(ret, top=10)
# table.DownsideRisk(ret)
# charts.PerformanceSummary(ret)