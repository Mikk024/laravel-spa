import React, { useState } from 'react'
import { NavLink} from 'react-router-dom'
import useAuthContext from '../context/AuthContext'

const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [profile_image, setImage] = useState(null)

    const { register, errors } = useAuthContext()

    console.log(errors)

    const handleRegister = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('email', email)
        formData.append('name', name)
        formData.append('password', password)
        formData.append('password_confirmation', password_confirmation)
        formData.append('phone_number', phone_number)
        formData.append('profile_image', profile_image)
        register(formData)
    }


    return (
        
            <form onSubmit={handleRegister}>
                <section className="flex justify-center items-center my-24">
                    <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
                        <div className="mb-4">
                            <p className="text-gray-600 text-2xl">Register</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                            <p className="text-red-500">{errors.email ? errors.email : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name}/>
                            <p className="text-red-500">{errors.name ? errors.name : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                            <p className="text-red-500">{errors.password ? errors.password : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)} value={password_confirmation}/>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Phone number" onChange={(e) => setPhoneNumber(e.target.value)} value={phone_number}/>
                            <p className="text-red-500">{errors.phone_number ? errors.phone_number : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="file" placeholder="Phone number" onChange={(e) => setImage(e.target.files[0])}/>
                        </div>
                        <div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200" type='submit'>Register</button>
                        </div>
                        <div className="flex items-end">
                        <div>
                            <p className="text-sm text-gray-600">Already have an account? <NavLink to="/login" className='text-blue-500 hover:underline'>Login Now</NavLink></p>
                        </div>
                        </div>
                    </div>
                </section>
            </form>
    )
}


export default RegisterPage