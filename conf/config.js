module.exports = {
    mongo_ip: process.env.MONGO_IP || "localhost",
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
    technical:{
        
    }
};