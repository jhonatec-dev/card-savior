import { ThemeProvider, createTheme } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { AppProvider } from './context'
import EditProfile from './pages/EditProfile'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

const theme = createTheme({
  // typography: {
  //   // fontFamily: 'NK57 Monospace',
  // },
  palette: {
    common: {
      // main: '#fff',
      // light: 'white'
    },
    primary: {
      light: '#309',
      main: 'rgba(255, 255, 255, 0.85)',
    },
    secondary: {
      light: '#000',
      main: '#000',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.85)',
      secondary: 'rgba(255, 255, 255, 0.85)',
    },
    background: {
      paper: 'rgba(0,0,0,0.75)',
    },

  },
});

function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={ theme }>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<EditProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </ThemeProvider>
    </AppProvider>
  )
}

export default App
