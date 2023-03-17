import { useRouteError } from "react-router-dom"

export default function CurrencyError() {
  const error = useRouteError()

  return(
    <div>
      Currency Error
      <h3>Something went fucky</h3>:
      <p>{error.message}</p>
    </div>
  )
}
