import axios from "../api/axios"
import { useEffect, useState } from "react"
import ReservationList from "../components/ReservationList"
import LoadingSpinner from "../components/LoadingSpinner"

const ReservationsPage = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`api/v1/reservations/manage?page=${page}`)
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

    return (
        <div className="px-4 md:px-32 md:py-16 py-16">
            <p className="text-center text-4xl mt-4">Reservations</p>
            <div className="grid md:grid-cols-6 gap-6 text-3xl text-black mt-8">
                <p>Address</p>
                <p>Start Date</p>
                <p>End Date</p>
                <p>Total Price</p>
                <p>Status</p>
                <p>Action</p>
            </div>
            {isLoading ? <LoadingSpinner />  :<ReservationList data={data}/>}
        </div>
    )
}


export default ReservationsPage