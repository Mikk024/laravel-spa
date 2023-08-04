import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import useAuthContext from "../context/AuthContext"

const AuthDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { logout, image, user } = useAuthContext()

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative">
       <button
          className="block px-4 py-2 border rounded-full space-x-6 hover:bg-gray-800 hover:text-white"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faBars} />
          {image ? <img src={image} className="w-7 h-7 inline-block object-cover rounded-full"/> :<FontAwesomeIcon icon={faUser} />}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
            <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg' to="/reservations">
              Reservations
            </NavLink>
            <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg' to="/rooms">
              Rooms
            </NavLink>
            <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg' to={`/user/${user.data.id}`}>
              User profile
            </NavLink>
            <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg">
              Logout
            </button>
          </div>
        )}
      </div>
    )
}

export default AuthDropdown