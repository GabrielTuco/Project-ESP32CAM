
import { ConfigurationBar } from './Components/ConfigurationBar'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { Login } from './pages/Login'
import "./App.css"
import StoreProvider from './context/StoreProvider'
import { Register } from './pages/Register'

function App() {
  
  return (

      <StoreProvider>
        <BrowserRouter>
          <Routes>      
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/MainPage" element={<MainPage/>}></Route>
            <Route path="/" element={<Navigate to={'/login'}/>}></Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>

  )
}

export default App
