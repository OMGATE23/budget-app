import { createBrowserRouter , RouterProvider } from "react-router-dom";
import { logoutAction } from "./actions/logout";
import Main, { mainLoader } from "./layouts/Main";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Main/>,
    loader : mainLoader,
    children : [
      {
        index : true,
        element : <Dashboard/>,
        loader : dashboardLoader,
        action : dashboardAction,
        
        errorElement :<Error/>
      } ,
      {
        path : "logout",
        action : logoutAction
      }
    ]
  },
   
])
function App() {
  return (
    <div className="App">
      <RouterProvider router = {router}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
