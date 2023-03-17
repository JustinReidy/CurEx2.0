import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Router } from 'react-router-dom';

import Search, { searchLoader } from './components/Search';

import NotFound from './components/NotFound';
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';
import CurrencyDetails, { currencyDetailsLoader } from './components/CurrencyDetails';
import CurrencyLayout from './layouts/CurrencyLayout';
import CurrencyError from './components/CurrencyError';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>} errorElement={<CurrencyError />}>
      <Route index element={<Search />} loader={searchLoader}/>
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" />
        <Route path="contact" />
      </Route>

      <Route path="currency" element={<CurrencyLayout />}>
        <Route path=":id" element={<CurrencyDetails />} loader={currencyDetailsLoader}>

        </Route>
      </Route>

      {/* 404 Handling */}
      <Route path="*" element={<NotFound/>} />
      </Route>
  )
)

function App() {
  return (
    <div className="">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
