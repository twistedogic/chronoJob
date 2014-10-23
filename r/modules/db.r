library('RMySQL')
importDataMySQL <- function(species.id, network.name, data.source, description) {
  con <- dbConnect(MySQL(),user="root", password="",dbname="my_db", host="10.0.42.1",client.flag=CLIENT_MULTI_STATEMENTS)
  on.exit(dbDisconnect(con))
  sql <- sprintf("insert into networks
    (species_id, name, data_source, description, created_at)
    values (%d, '%s', '%s', '%s', NOW());
    select last_insert_id();",
    species.id, network.name, data.source, description)
  rs <- dbSendQuery(con, sql)

  if (dbMoreResults(con)) {
    rs <- dbNextResult(con)
    id <- fetch(rs)[1,1]
  } else {
    stop('Error getting last inserted id.')
  }

  dbClearResult(rs)

  return(id)
}
