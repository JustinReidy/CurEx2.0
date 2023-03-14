import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import Select from 'react-select'
import makeAnimated from 'react-select/animated'


function Search() {
    const navigate = useNavigate()

    const [fromCurrency, setFromCurrency] = useState({})
    const [toCurrency, setToCurrency] = useState({})
    const [amount, setAmount] = useState({})

    const data = useLoaderData()

    const handleSubmit = e => {
        e.preventDefault()
        if(fromCurrency === '' || toCurrency === '') {
            // error
        }

      console.log(amount)
        // concat variables to pass to navigate
        let id = `${fromCurrency.value}_${toCurrency.value}_${amount}`
        navigate(`/currency/${id}`, {state: {fromCurrencyName: fromCurrency.label, toCurrencyName: toCurrency.label, amount: amount}})
    }
   
    const handleChange = (e) => {
      setAmount(e.target.value)
    }

  return (
    <form onSubmit={handleSubmit} className="flex justify-around py-3">
        <div id="OptionOne">
            <Select options={data} onChange={setFromCurrency} placeholder="Select an option" noOptionsMessage={() => 'Something has gone wrong'} required/>
        </div>
        <div id="arrow">
          <div>
            <textarea onChange={handleChange} placeholder="Please enter an amount" />
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="fill-black w-10 h-10"><path d="M10 7H2v6h8v5l8-8-8-8v5z"/></svg>
        </div>
        <div id="OptionTwo">
            <Select options={data} onChange={setToCurrency} placeholder="Select an option" noOptionsMessage={() => 'Something has gone wrong'} required/>
        </div>
        <div id="Search" className="objet-center">
            <button className="bg-gray-300 hover:bg-teal-400 text-gray-800 hover:text-white font-bold py-2 px-4 rounded inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </button>
        </div>
    </form>
  )
}

export default Search; 

export const searchLoader = async () => {

    let myHeaders = new Headers()
    myHeaders.append("apikey", '0GM5sJHuNTrIttSw06qsMbkw75dhLP6A')

    let requestOptions = {
        method: 'GET',
        headers: myHeaders
    }
    const res = await fetch('https://api.apilayer.com/fixer/symbols', requestOptions)
    
    const data = await res.json()

    if (data.success === false) 
    {
        return "ERROR"
    }

    // Manipulate data to be in a "Value", "Label" object for react-select
    let options = []

    Object.entries(data.symbols).map(([k, v]) => {
        options.push({value: `${k}`, label: `${v}`})
    })

    return options
}
