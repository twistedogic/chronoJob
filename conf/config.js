module.exports = {
    mongo_ip: process.env.MONGO_IP || "localhost",
    base_url:"https://api.investtab.com/api/quote/",
    report:["financial-ratios","balance-sheet","cashflow-statement","income-statement","earnings-summary","dividend-history","fundamentals"],
    quote:"historical-prices",
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
    },
    dtop_header:[
        "Recordtype","Market","MarketName","Underlying","ExpiryMonth","ExpiryYear","Strike","Call_Gross","Call_Net","Call_NetChange","Call_TO","Call_Deal","Call_SettlePrice","Call_PriceChange","Put_Gross","Put_Net","Put_NetChange","Put_TO","Put_Deal","Put_SettlePrice","Put_PriceChange"
    ],
    rp_header:[
        "RecordType","Series","Market","MarketName","Commodity","CommodityName","CurrencyCode","SettlementPrice","PreviousSettlementPrice","Difference","ImpliedVolatility"
    ],
    dqe_header:[
        "HKATS_CODE","UNDERLYING_STOCK","SYMBOL","TOTAL_VOLUMN","CALLS_VOLUMN","PUTS_VOLUMN","TOTAL_OPEN_INTEREST","CALLS_OPEN_INTEREST","PUTS_OPEN_INTEREST","IV"
    ]
};
