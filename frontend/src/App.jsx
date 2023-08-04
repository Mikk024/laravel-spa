import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RentPage from './pages/RentPage'
import ShowPage from './pages/ShowPage'
import AuthLayout from './layouts/AuthLayout'
import GuestLayout from './layouts/GuestLayout'
import RoomsPage from './pages/RoomsPage'
import ReservationsPage from './pages/ReservationsPage'
import EditRoomPage from './pages/EditRoomPage'
import UserPage from './pages/UserPage'
import ReviewPage from './pages/ReviewPage'




const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/rent' element={<RentPage /> } />
          <Route path='/rooms' element={<RoomsPage />} />
          <Route path='/reservations' element={<ReservationsPage />} />
          <Route path='/room/:roomId/edit' element={<EditRoomPage />} />
          <Route path='/review' element={<ReviewPage />}/>
        </Route>
        <Route path='/' element={<HomePage />} />
        <Route path='/room/:roomId' element={<ShowPage />} />
        <Route path='/user/:userId' element={<UserPage />}/>
      </Routes >
    </>
  )
}

export default App
