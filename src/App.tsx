import { ThemeProvider, createTheme } from '@mui/material'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import EditProfile from './pages/EditProfile'
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
      light: '#ffe81f',
      main: '#ffe81f',
    },
    secondary: {
      light: '#000',
      main: '#000',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.85)',
      secondary: '#ffe91fa7',
    },
    background: {
      paper: 'rgba(0,0,0,0.75)',
    },

  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <>
      <ThemeProvider theme={ theme }>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<EditProfile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </ThemeProvider>
    </>
  )
}

export default App
