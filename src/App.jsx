
import { ConfigurationBar } from './Components/ConfigurationBar'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AdminPage } from './pages/AdminPage'
import { UserPage } from './pages/UserPage'
import { Login } from './pages/Login'
import './App.css'
import StoreProvider from './context/StoreProvider'

function App() {
  
  return (

      <StoreProvider>
        <BrowserRouter>
          <Routes>      
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/AdminPage" element={<AdminPage/>}></Route>
            <Route path="/UserPage" element={<UserPage/>}></Route>
            <Route path="/" element={<Navigate to={'/login'}/>}></Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>

  )
}

export default App
