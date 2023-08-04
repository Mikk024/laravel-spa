import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import LoadingSpinner from '../components/LoadingSpinner'
import Profile from "../components/Profile"
import axios from "../api/axios"


const UserPage = () => {

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const { userId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user  = await axios.get(`api/v1/users/${userId}`)
                console.log(user)
                setData(user.data.data)
            } catch (e) {
                console.log(e)
            }
        }
        setTimeout(() => {
            fetchData()
            setIsLoading(false)
        }, 500)  
    }, [])

    return (
        <div className="px-32 my-20 flex justify-center text-center">
            {isLoading ? <LoadingSpinner /> : <Profile data={data} />}
        </div>
    )
}


export default UserPage