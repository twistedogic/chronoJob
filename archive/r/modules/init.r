# apt-get install libcurl4-openssl-dev
# apt-get install libxml2-dev
# apt-get install libglpk-dev
# apt-get install libmysqlclient-dev
install.packages(c('devtools','quantmod','fTrading','TTR','robustbase','quadprog','Rglpk','tseries','xts','forecast','pmml','XML','randomForest','deepnet','PerformanceAnalytics'),repos='http://cran.rstudio.com/')
install.packages('http://cran.r-project.org/src/contrib/Archive/fCopulae/fCopulae_3000.79.tar.gz',repos=NULL,type='source')
install.packages(c('sn','ecodist','energy','mvnormtest'),repos='http://cran.rstudio.com/')
install.packages('http://cran.at.r-project.org/src/contrib/Archive/fAssets/fAssets_3003.81.tar.gz',repos=NULL,type='source')
install.packages('http://cran.r-project.org/src/contrib/Archive/fPortfolio/fPortfolio_2130.80.tar.gz',repos=NULL,type='source')
library(devtools)
install_github('rhochreiter/financeR')
install.packages(c('rredis','RMySQL','shiny','opencpu'), repos='http://cran.rstudio.com/')
install.packages(c('rjson','statmod','RCurl','bitops','httr','plyr','RJSONIO'), repos='http://cran.rstudio.com/')
install.packages("h2o", repos="http://h2o-release.s3.amazonaws.com/h2o/rel-mirzakhani/2/R")

install.packages(c('dlm','GeneCycle','TSA','signal','fftw','forecast'), repos='http://cran.rstudio.com/')