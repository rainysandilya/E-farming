
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Rootlayout from './components/Rootlayout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Aboutus from './components/Aboutus';
import Menu from './components/Menu';
import Addfooditems from './components/Addfooditems';
import Users from './components/Users';
import Cart from './components/Cart';
import './App.css';
import UserLoginStore from './contexts/UserLoginStore';



function App() {
let router=createBrowserRouter([
  {
    path:"/",
    element:<Rootlayout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/Login",
        element:<Login/>
      },
      {
        path:"/Register",
        element:<Register/>
      },
      {
        path:"/Menu",
        element:<Menu/>
      },
      {
        path:"/Aboutus",
        element:<Aboutus/>
      },
      {
        path:"/Addfooditems",
        element:<Addfooditems/>
      }
      // {
      //   path:"/Users",
      //   element:<Users/>
      // }
      ,
      {
        path:"/Cart",
        element:<Cart/>
      }
      
    ]
  }
])


  return (
    <div className="App">
      <UserLoginStore>
     <RouterProvider router={router}/>
     </UserLoginStore>
    </div>
  );
}

export default App;
