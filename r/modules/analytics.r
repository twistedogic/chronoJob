library(pmml)
library(XML)

rawDataDF <- result
rawDataDF <- na.omit(rawDataDF)
 
target <- rawDataDF$TARGET_Adjusted
 
N <- length(target)
M <- N-500
 
data.trainingIndex <- sample(N,M)
data.trainingSet <- rawDataDF[data.trainingIndex,]
data.testSet <- rawDataDF[-data.trainingIndex,]
 
glm.model <- glm(data.trainingSet$TARGET_Adjusted ~ ., data=data.trainingSet, family="binomial")
glm.pmml <- pmml(glm.model, name="GLM Model", data=data.trainingSet)
 
xmlFile <- file.path(getwd(),"glm-pmml.xml")
saveXML(glm.pmml,xmlFile)
