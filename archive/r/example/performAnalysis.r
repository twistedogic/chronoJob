library(quantmod)
library(PerformanceAnalytics)
# s <- get(stockId[1])
# s$sma20 <- SMA(Cl(s) , 20)
# s$position <- ifelse(Cl(s) > s$sma20 , 1 , -1)
# myReturn <- lag(s$position) * dailyReturn(s)
# charts.PerformanceSummary(cbind(dailyReturn(s),myReturn))

# Step 1: Get the data
s <- get(stockId[1])

# Step 2: Create your indicator
dvi <- DVI(Cl(s))

# Step 3: Construct your trading rule
sig <- Lag(ifelse(dvi$dvi < 0.5, 1, -1))

# Step 4: The trading rules/equity curve
ret <- ROC(Cl(s))*sig
ret <- ret['2013-06-02/2014-10-20']
eq <- exp(cumsum(ret))
plot(eq)

# Step 5: Evaluate strategy performance
table.Drawdowns(ret, top=10)
table.DownsideRisk(ret)
charts.PerformanceSummary(cbind(dailyReturn(s),ret))