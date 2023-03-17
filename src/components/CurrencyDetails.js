import { useLoaderData, useLocation, useParams } from "react-router-dom"

import HistoricalGraph from './HistoricalGraph'

export default function CurrencyDetails() {
    const currency = useLoaderData()
    const location = useLocation()
    let logo = '../img/curex.png'

    let fromCurSymbol = getCurrencySymbol(currency.currentData.query.from)
    let toCurSymbol = getCurrencySymbol(currency.currentData.query.to)

   let fromImg = currency.catArr[0]
   let toImg = currency.catArr[1]
   console.log(fromImg)

    return (
        <div className="grid grid-cols-5 gap-4 py-3">
          {/* From Currency Card */}
          <div className="col-span-1 pl-3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full" src={fromImg} alt="Test"></img>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{location.state.fromCurrencyName}</div>
                <p class="text-gray-700 text-base">{fromCurSymbol}{currency.currentData.query.amount}</p>
              </div>
            </div>
          </div>
          {/* Arrow */}
          <div className="col-span-1 flex h-screen items-center justify-center">
            ->
          </div>
          {/* To Currency Card */}
          <div className="col-span-1 pl-3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img class="w-full" src={toImg} alt="Test" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{location.state.toCurrencyName}</div>
                <p class="text-gray-700 text-base">{toCurSymbol}{currency.currentData.result}</p>
              </div>
            </div>
          </div>
          {/* Historical Data */}
          <div className="col-span-2">
            <HistoricalGraph data={currency.historicData.rates}/>
          </div>
        </div>
    )
}

export const currencyDetailsLoader = async ({ params }) => {

    class CurrencyData {
      constructor(currentData, historicData, catArr) {
        this.currentData = currentData
        this.historicData = historicData
        this.catArr = catArr
      }
    }

    var myHeders = new Headers()
    myHeders.append("apikey", '0GM5sJHuNTrIttSw06qsMbkw75dhLP6A')

  const requestOptions = {
    method: 'GET',
    headers: myHeders
  }
    
    // Variables for the two currencies
    const { id } = params
    // Split id on "_" to get items for API call(Need to optimize this)
    let arr = id.split("_") 

    //Get dates for historic rate data
    let today = new Date()
    let startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    // convert dates to a YYY-MM-DD format 
    today = convertDate(today)
    startDate = convertDate(startDate)

    // Will eventually change this to get more relivant images until then Cats as a Service with the currency code will have to do

    let fromCatFetch = await fetch(`https://cataas.com/c/s/${arr[0]}?json=true&w=100&h=100`)
    let toCatFetch = await fetch(`https://cataas.com/c/s/${arr[1]}?json=true&w=100&h=100`)

    let fromCat = await fromCatFetch.json()
    let toCat = await toCatFetch.json()

    let catArr = [`https://cataas.com${fromCat.url}`, `https://cataas.com${toCat.url}`] 
    
    const currentData = {
      success: true,
      result: 577.231179,
      query: {
        from: 'AED',
        to: 'BIF',
        amount: 1
      }
    }

  const historicData = {
    base:"AED",
    end_date:"2023-03-16",
    rates: {
      "2022-09-11":{BIF: 557.575345},
      "2022-09-12":{BIF: 556.750582},
      "2022-09-13":{BIF: 556.750642},
      "2022-09-14":{BIF: 556.477521},
      "2022-09-15":{BIF: 558.111138},
      "2022-09-16":{BIF: 557.566535},
      "2022-09-17":{BIF: 555.276548},
      "2022-09-18":{BIF: 555.276548},
      "2022-09-19":{BIF: 555.276548},
      "2022-09-20":{BIF: 555.389535},
      "2022-09-21":{BIF: 554.300196},
      "2022-09-22":{BIF: 558.111817},
      "2022-09-23":{BIF: 557.43993},
      "2022-09-24":{BIF: 565.785123},
      "2022-09-25":{BIF: 565.79504},
      "2022-09-26":{BIF: 557.439416},
      "2022-09-27":{BIF: 557.567241},
      "2022-09-28":{BIF: 557.40491},
      "2022-09-29":{BIF: 557.295103},
      "2022-09-30":{BIF: 557.579256},
      "2022-10-01":{BIF: 557.579256},
    },
    start_date:"2022-03-16",
    success:true
  }

    // let data = new CurrencyData(currentData, historicData)
    
    // const currentRateRes = await fetch(`https://api.apilayer.com/fixer/convert?to=${arr[1]}&from=${arr[0]}&amount=${arr[2]}`, requestOptions)
    // const historicRateRes = await fetch(`https://api.apilayer.com/fixer/timeseries?start_date=${startDate}&end_date=${today}&base=${arr[0]}&symbols=${arr[1]}`, requestOptions)

    // const currentData = await currentRateRes.json()
    // const historicData = await historicRateRes.json()
    let data = new CurrencyData(currentData, historicData, catArr)

    if(data.currentData.success === false) {
        throw Error("Could not find a conversion")
    }

    return data
}


const convertDate = date => {
  let year = date.toLocaleString("default", { year: "numeric"});
  let month = date.toLocaleString("default", { month : "2-digit"});
  let day = date.toLocaleString("default", { day: "2-digit"})
  let formattedDate = `${year}-${month}-${day}`
  return formattedDate
}

const getCurrencySymbol = currencyCode => {
  const currencies = {
    "AED":"1547",//delete
    "AFN":"1547",
    "ALL":"76,101,107",
    "AMD":"",
    "ANG":"402",
    "AOA":"",
    "ARS":"36",
    "AUD":"36",
    "AWG":"402",
    "AZN":"8380",
    "BAM":"75, 77",
    "BBD":"36",
    "BDT":"",
    "BGN":"1083, 1074",
    "BHD":"",
    "BIF":"36",//delete
    "BMD":"36",
    "BND":"",
    "BOB":"36, 39",
    "BRL":"82, 36",
    "BSD":"36",
    "BTC":"",
    "BTN":"",
    "BWP":"80",
    "BYN":"66, 114",
    "BYR":"",
    "BZD":"66, 90, 36",
    "CAD":"36",
    "CDF":"67, 72, 70",
    "CHF":"",
    "CLF":"",
    "CLP":"36",
    "CNY":"165",
    "COP":"36",
    "CRC":"8353",
    "CUC":"",
    "CUP":"8369",
    "CVE":"",
    "CZK":"75, 269",
    "DJF":"",
    "DKK":"107, 114",
    "DOP":"82, 68, 36",
    "DZD":"",
    "EGP":"163",
    "ERN":"",
    "ETB":"",
    "EUR":"8364",
    "FJD":"36",
    "FKP":"163",
    "GBP":"163",
    "GEL":"",
    "GGP":"163",
    "GHS":"162",
    "GIP":"163",
    "GMD":"",
    "GNF":"",
    "GTQ":"81",
    "GYD":"36",
    "HKD":"36",
    "HNL":"76",
    "HRK":"107, 110",
    "HTG":"",
    "HUF":"70, 116",
    "IDR":"82, 112",
    "ILS":"8362",
    "IMP":"163",
    "INR":"8377",
    "IQD":"",
    "IRR":"65020",
    "ISK":"107, 114",
    "JEP":"163",
    "JMD":"74, 36",
    "JOD":"",
    "JPY":"165",
    "KES":"",
    "KGS":"1083, 1074",
    "KHR":"6107",
    "KMF":"",
    "KPW":"8361",
    "KRW":"8361",
    "KWD":"",
    "KYD":"36",
    "KZT":"1083, 1074",
    "LAK":"8365",
    "LBP":"163",
    "LKR":"8360",
    "LRD":"36",
    "LSL":"",
    "LTL":"",
    "LVL":"",
    "LYD":"",
    "MAD":"",
    "MDL":"",
    "MGA":"",
    "MKD":"1076, 1077, 1085",
    "MMK":"",
    "MNT":"8366",
    "MOP":"",
    "MRO":"",
    "MUR":"8360",
    "MVR":"",
    "MWK":"",
    "MXN":"36",
    "MYR":"82, 77",
    "MZN":"77, 84",
    "NAD":"36",
    "NGN":"8358",
    "NIO":"67, 36",
    "NOK":"107, 114",
    "NPR":"8360",
    "NZD":"36",
    "OMR":"65020",
    "PAB":"66, 47, 46",
    "PEN":"83, 47, 46",
    "PGK":"",
    "PHP":"8369",
    "PKR":"8360",
    "PLN":"122, 322",
    "PYG":"71, 115",
    "QAR":"65020",
    "RON":"108, 101, 105",
    "RSD":"1044, 1080, 1085, 46",
    "RUB":"8381",
    "RWF":"",
    "SAR":"65020",
    "SBD":"36",
    "SCR":"8360",
    "SDG":"",
    "SEK":"107, 114",
    "SGD":"36",
    "SHP":"163",
    "SLE":"",
    "SLL":"",
    "SOS":"83",
    "SRD":"36",
    "STD":"",
    "SVC":"36",
    "SYP":"163",
    "SZL":"",
    "THB":"3647",
    "TJS":"",
    "TMT":"",
    "TND":"",
    "TOP":"",
    "TRY":"8378",
    "TTD":"84, 84, 36",
    "TWD":"78, 84, 36",
    "TZS":"",
    "UAH":"8372",
    "UGX":"",
    "USD":"36",
    "UYU":"36, 85",
    "UZS":"1083, 1074",
    "VEF":"66, 115",
    "VES":"",
    "VND":"83,63",
    "VUV":"",
    "WST":"",
    "XAF":"",
    "XAG":"",
    "XAU":"",
    "XCD":"36",
    "XDR":"",
    "XOF":"",
    "XPF":"",
    "YER":"65020",
    "ZAR":"82",
    "ZMK":"",
    "ZMW":"",
    "ZWL":"90, 36"
  }

  if (currencies[currencyCode] === undefined){
    return
  }

  let currencySymbolStr = currencies[currencyCode]

  let unicodeChars = currencySymbolStr.split(",")
  let currencySymbol = ""
  for (let i = 0; i < unicodeChars.length; i++) {
    currencySymbol += String.fromCharCode(unicodeChars[i])
  }

  return currencySymbol
}