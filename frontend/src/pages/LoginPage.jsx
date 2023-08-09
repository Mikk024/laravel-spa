import React, { useState } from 'react'
import { NavLink} from 'react-router-dom'
import useAuthContext from '../context/AuthContext';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, errors } = useAuthContext()

    const handleLogin = async (e) => {
        e.preventDefault();
        login({email, password})
    }

    return (
        <>  
            <form onSubmit={handleLogin}>
                <section className="flex justify-center items-center h-screen bg-gray-100">
                    
                    <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
                        <div className="mb-4">
                            <p className="text-gray-600 text-2xl">Sign In</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                            <p className='text-red-500'>{errors.email ? errors.email : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                            <p className='text-red-500'>{errors.password ? errors.password : null}</p>
                        </div>
                        <div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200" type='submit'>Sign In</button>
                        </div>
                        <div className="flex items-end">
                        <div>
                            <p className="text-sm text-gray-600">Don't have an account? <NavLink to="/register" className='text-blue-500 hover:underline'>Register Now</NavLink></p>
                        </div>
                        </div>
                    </div>
                </section>
            </form>
        </>
    )
}


export default LoginPage