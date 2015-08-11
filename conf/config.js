module.exports = {
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
    }
};
