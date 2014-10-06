# apt-get install libcurl4-openssl-dev
# apt-get install libxml2-dev
# apt-get install libglpk-dev
install.packages(c('devtools','quantmod','Quandl','fTrading','TTR','robustbase','quadprog','Rglpk','tseries','xts','lubridate','modeest','forecast','pmml','XML','randomForest'),repos='http://cran.rstudio.com/')
#install.packages('http://cran.r-project.org/src/contrib/Archive/fCopulae/fCopulae_3000.79.tar.gz',repos=NULL,type='source')
#install.packages(c('sn','ecodist','energy','mvnormtest'),repos='http://cran.rstudio.com/')
#install.packages('http://cran.at.r-project.org/src/contrib/Archive/fAssets/fAssets_3003.81.tar.gz',repos=NULL,type='source')
#install.packages('http://cran.r-project.org/src/contrib/Archive/fPortfolio/fPortfolio_2130.80.tar.gz',repos=NULL,type='source')
#library(devtools)
#install_github('financeR', user='rhochreiter')
install.packages(c('rredis','RMySQL'), repos='http://cran.rstudio.com/')
install.packages("h2o", repos=(c("http://h2o-release.s3.amazonaws.com/h2o/rel-lambert/5/R", getOption("repos"))))
