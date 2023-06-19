
import { Route, Routes } from 'react-router-dom'
import { AppProvider } from './context'
import { ProviderTheme } from './context/theme'
import EditProfile from './pages/EditProfile'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'


function App() {


  return (
    <AppProvider>
      <ProviderTheme>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<EditProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ProviderTheme>
    </AppProvider>
  )
}

export default App
