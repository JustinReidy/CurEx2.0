import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';

import NotFound from './components/NotFound';
import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Search />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" />
        <Route path="contact" />
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
