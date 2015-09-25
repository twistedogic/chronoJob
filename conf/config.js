module.exports = {
    mongo_ip: process.env.MONGO_IP || "localhost",
    db_name: "stock",
    base_url:"https://api.investtab.com/api/quote/",
    report:["financial-ratios","balance-sheet","cashflow-statement","income-statement","earnings-summary","dividend-history","fundamentals"],
    quote:"historical-prices",
    options:{
        stock:{
            option_report:{
                soe:"http://www.hkex.com.hk/eng/sorc/market_data/stock_options_exercised.aspx",
                pcr:"http://www.hkex.com.hk/eng/sorc/market_data/statistics_putcall_ratio.aspx"
            },
            option_query:{
                action:"ajax",
                type:"getCSV",
                ucode:null,
                date_form:null,
                date_to:null,
                page:null
            }
        },
        daily:{
            dtop:{
                url:"http://www.hkex.com.hk/eng/stat/dmstat/dayrpt/dqe",
                header:["Recordtype","Market","MarketName","Underlying","ExpiryMonth","ExpiryYear","Strike","Call_Gross","Call_Net","Call_NetChange","Call_TO","Call_Deal","Call_SettlePrice","Call_PriceChange","Put_Gross","Put_Net","Put_NetChange","Put_TO","Put_Deal","Put_SettlePrice","Put_PriceChange"]
            },  
            rp:{
                url:"http://www.hkex.com.hk/eng/stat/dmstat/OI/DTOP_O_20",
                header:["RecordType","Series","Market","MarketName","Commodity","CommodityName","CurrencyCode","SettlementPrice","PreviousSettlementPrice","Difference","ImpliedVolatility"]
            },
            dqe:{
                url:"http://www.hkex.com.hk/eng/market/rm/rm_dcrm/riskdata/srprices/RP006_",
                header:["HKATS_CODE","UNDERLYING_STOCK","SYMBOL","TOTAL_VOLUMN","CALLS_VOLUMN","PUTS_VOLUMN","TOTAL_OPEN_INTEREST","CALLS_OPEN_INTEREST","PUTS_OPEN_INTEREST","IV"]
                
            }
        }
    },
    technical:[
		{
        	methodName:"SMA250",
            name: "SMA",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 250
        },
        {
            methodName:"SMA100",
            name: "SMA",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 100
        },
        {
            methodName:"SMA50",
            name: "SMA",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 50
        },
        {
            methodName:"SMA20",
            name: "SMA",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 20
        },
        {
            methodName:"SMA10",
            name: "SMA",
            startIdx: 0,
            inReal: "c",
            optInTimePeriod: 10
        },
        {
            methodName:"MACD",
            name: "MACD",
            startIdx: 0,    
            inReal: "c",
            optInFastPeriod: 12,
            optInSlowPeriod: 26,
            optInSignalPeriod: 9
        },
        {
            methodName:"STOCH",
            name: "STOCH",
            startIdx: 0,    
            high: "h",
            low: "l",
            close: "c",
            optInFastK_Period: 5,
            optInSlowK_Period: 3,
            optInSlowK_MAType: 0,
            optInSlowD_Period: 3,
            optInSlowD_MAType: 0
        },
        {
            methodName:"RSI",
            name: "RSI",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 14
        },
        {
            methodName:"ROCP",
            name: "ROCP",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 10
        },
        {
            methodName:"STDDEV",
            name: "STDDEV",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 10,
            optInNbDev:1
        },
        {
            methodName:"MINMAX",
            name: "MINMAX",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 30
        },
        {
            methodName:"ATR",
            name: "ATR",
            startIdx: 0,    
            high: "h",
            low: "l",
            close: "c",
            optInTimePeriod: 14
        },
        {
            methodName:"BBANDS",
            name: "BBANDS",
            startIdx: 0,    
            inReal: "c",
            optInTimePeriod: 5,
            optInNbDevUp: 2,
            optInNbDevDn: 2,
            optInMAType: 0
        }
    ]
};