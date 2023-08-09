import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const getUser = async () => {
        const { data } = await axios.get('api/v1/user');
        setUser(data)
        setImage(data.data.profile_image)
    }

    const csrf = () => axios.get('sanctum/csrf-cookie')

    const login = async ({ email, password }) => {
        await csrf()
        try {
            await axios.post('login', {email, password})
            await getUser()
            navigate('/')
        } catch (e) {
           if (e.response.status === 422) {
            setErrors(e.response.data.errors)
           }
        }
    }

    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            axios.post('logout').then(() => {
                setUser(null)
            })
        }
    }

    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [])

    const register = async (formData) => {
        try {
            await axios.get('sanctum/csrf-cookie')
            await axios.post('register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            navigate('/')
        } catch (e) {
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }

    return (
    <AuthContext.Provider value={{ user, getUser, login, register, logout, errors, image}}>
        {children}
    </AuthContext.Provider>
    )
}



export default function useAuthContext() {
    return useContext(AuthContext)       
}