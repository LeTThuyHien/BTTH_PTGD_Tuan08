import './App.css'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Overview from './Components/Overview/Overview'
import Sidebar   from './Components/Sidebar/Sidebar'
import Content from './Components/Content/Content'

function App() {
  return (
    <div className='app'>
      <Header />
      <Overview />
      <Content/>
      <Sidebar/>
      <Footer />
    </div>
 
  )
}

export default App
