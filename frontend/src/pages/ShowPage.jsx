import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import Show from '../components/Show'
import LoadingSpinner from '../components/LoadingSpinner'

const ShowPage = () => {

    const [data, setData] = useState([])
    const [reviews, setReviews] = useState([])
    const [dates, setDates] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const { roomId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const [dataResponse, reviewsResponse, datesResponse] = await Promise.all([
                axios.get(`api/v1/rooms/${roomId}`),
                axios.get(`api/v1/reviews/${roomId}`),
                axios.get(`api/v1/reservations/${roomId}`)
            ]);
            setData(dataResponse.data.data)
            setReviews(reviewsResponse.data.data)
            setDates(datesResponse.data)
        }
        setTimeout(() => {
            fetchData()
            setIsLoading(false)
        }, 200)
    }, [roomId])

    return (
        <>
            {isLoading ? <LoadingSpinner /> : <Show data={data} reviews={reviews} disabledDates={dates} />}
        </> 
    )
}

export default ShowPage