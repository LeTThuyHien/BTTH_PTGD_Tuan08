import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Router/Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='app'>
      <ToastContainer />
      <RouterProvider router={router} />
    </div>

  )
}

export default App
