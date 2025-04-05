import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './Router/Routes'


function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    
    </div>
 
  )
}

export default App
