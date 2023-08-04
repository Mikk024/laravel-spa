import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import useAuthContext from '../context/AuthContext';
import GuestDropdown from './GuestDropdown';
import AuthDropdown from './AuthDropdown';

const Navbar = () => {
    const { user } = useAuthContext();

    return (
        <nav className="flex flex-wrap justify-between py-4 md:py-6 px-4 md:px-28 border text-xl capitalize text-gray-700 fixed-top shadow-lg fixed-top">
            <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
                <p className='text-red-400 text-2xl'>
                    <NavLink exact to="/">
                        <FontAwesomeIcon icon={faHouse} />
                        HRentals
                    </NavLink>
                </p>
            </div>
            <div className='flex flex-wrap justify-between w-full md:w-auto'>
                <div className="flex items-center space-x-6">
                    <p className='rounded-full hover:bg-gray-100 p-2 transition duration-200'>
                        <NavLink to="/rent">rent your house</NavLink>
                    </p>
                </div>
                <div className="flex items-center space-x-6 mt-2 md:mt-0">
                    {user ? <AuthDropdown /> : <GuestDropdown /> }
                </div>
            </div>
      </nav>
    );
}

export default Navbar