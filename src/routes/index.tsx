import { Route, Routes } from 'react-router-dom'
import EditProfile from '../pages/EditProfile'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<EditProfile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
