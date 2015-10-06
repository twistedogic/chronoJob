import com.stratio.provider.mongodb._
val options = Map("host" -> "10.1.20.3:27017", "database" -> "stock", "collection" -> "fundamentals")
val df = sqlContext.read.format("com.stratio.provider.mongodb").options(options).load
import org.apache.spark.h2o._
val h2oContext = new H2OContext(sc).start()
import h2oContext._
import hex.deeplearning._
val dlParams = new DeepLearningParameters()
val trainFrame:H2OFrame = sqlContext.sql("SELECT last_current_ratio,last_roe,issue_cap,auth_cap_shares,market_cap,last_nav,last_price_book,par_value,last_eps,last_gross_margin,total_issue_cap,last_dps,last_pe,last_peg,last_ltd_equity,board_lot,last_close from fun")