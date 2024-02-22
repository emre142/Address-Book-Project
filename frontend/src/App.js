import './App.css';
import {Link} from "react-router-dom"
import Breadcrumbs from './components/AppBreadcrumbs'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Address from './pages/Address';
import Addresstype from './pages/Addresstype';
import City from './pages/City';
import Country from './pages/Country';
import Person from './pages/Person';
import Addressbook from './pages/Addressbook';
import "./styles.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>HOME!<Breadcrumbs/> 
      <Link className="Links" to="/addressbook">
        Address Book
      </Link>
    </div>,
  },
  {
    path: "/addressbook",
    element: <div>
      <Breadcrumbs/>
      <Addressbook/>
    </div>,
  },
  {
    path: "/addressbook/person/address" ,
    element: <div>
      <Breadcrumbs/>
      <Address/>
    </div>,
  },
  {
    path: "/addressbook/addresstype",
    element: <div>
      <Breadcrumbs/>
      <Addresstype/>
    </div>,
  },
  {
    path: "/addressbook/city",
    element: <div>
      <Breadcrumbs/>
      <City/>
    </div>,
  },
  {
    path: "/addressbook/country",
    element: <div>
      <Breadcrumbs/>
      <Country/>
    </div>,
  },
  {
    path: "/addressbook/person",
    element: <div>
      <Breadcrumbs/>
      <Person/>
    </div>,
  },
]);


function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
