import { useEffect, useState } from "react"
import RoomList from "../components/RoomList"
import axios from "../api/axios"
import LoadingSpinner from "../components/LoadingSpinner"

const RoomsPage = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
        
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`api/v1/rooms/manage?page=${page}`)
                setData((prevCards) => [...prevCards, ...response.data.data])
            } catch (e) {
                console.log(e)
            }
        }
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
              setPage((prevPage) => prevPage + 1);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          setTimeout(() => {
            fetchData();
            setIsLoading(false);
          }, 500);
      
          return () => window.removeEventListener('scroll', handleScroll);
    }, [page])

    const handleDelete = async (roomId) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                const response = await axios.delete(`api/v1/rooms/${roomId}`)
                console.log(response)
            } catch (e) {
                console.log(e)
                if (e.response.status === 403) {
                    alert(e.response.data.message)
                }
            }
        }
    }

    return (
        <div className="px-4 md:px-32 my-10">
                {isLoading ? <LoadingSpinner /> : 
                <RoomList data={data} handleDelete={handleDelete} />
                }
        </div>
    )
}

export default RoomsPage