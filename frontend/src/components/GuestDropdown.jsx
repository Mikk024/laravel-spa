import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const GuestDropdown = () => {
    const [isOpen, setIsOpen] = useState(false)

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
          <FontAwesomeIcon icon={faUser} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
            <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg' to="/login">
                Login
            </NavLink>
            <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg' to="/register">
                Register
            </NavLink>
          </div>
        )}
      </div>
    )
}

export default GuestDropdown