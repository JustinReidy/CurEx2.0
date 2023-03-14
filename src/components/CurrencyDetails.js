import { useLoaderData, useLocation, useParams } from "react-router-dom"

export default function CurrencyDetails() {
    const { id } = useParams()
    const currency = useLoaderData()
    const location = useLocation()

    return (
        <div>
            <span>{location.state.test}</span>
            <h1 className="">{location.state.fromCurrencyName}</h1><span>{location.state.amount}</span>
            <h1>{location.state.toCurrencyName}</h1><span>{currency.result}</span>
        </div>
    )
}

export const currencyDetailsLoader = async ({ params }) => {
    var myHeders = new Headers()
    myHeders.append("apikey", "apikey")

  const requestOptions = {
    method: 'GET',
    headers: myHeders
  }
    
    // Variables for the two currencies
    const { id } = params
    console.log(params)
    // Split id on "_" to get items for API call(Need to optimize this)
    let arr = id.split("_") 
    console.log(arr)

    const res = await fetch(`https://api.apilayer.com/fixer/convert?to=${arr[1]}&from=${arr[0]}&amount=${arr[2]}`, requestOptions)


    const data = await res.json()

    if(data.success === false) {
        // error
    }

    return data
}
