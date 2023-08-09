import axios from '../api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ReviewPage = () => {
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState()
    const [disabled, setDisabled] = useState(false)

    const location = useLocation()

    const navigate = useNavigate()

    const param  = location.state.data

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setDisabled(true)
            await axios.post('api/v1/reviews', {
                reservation_id: param,
                comment: comment,
                rating: rating
            })
            navigate('/')
        } catch (e) {
            setDisabled(false)
            if (e.response.status === 403) {
                alert(e.response.data.message)
                navigate('/')
            }
        }
    }

    const disabledStyle = {
        backgroundColor: 'gray',
        transition: 'all .2s ease',
        color: 'white'
    }

    return (
        <form onSubmit={handleSubmit}>
                <section className="flex justify-center items-center min-h-screen bg-gray-100">
                    <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
                        <div className="mb-4">
                            <p className="text-gray-600 text-2xl text-center">Leave a note!</p>
                        </div>
                        <div>
                            <textarea 
                            cols="30" 
                            rows="10" 
                            className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" 
                            placeholder="Comment" 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='space-x-8 text-4xl md:text-5xl py-8'>
                            <button type='button' onClick={() => setRating(1)} style={rating >= 1 ? {color: 'yellow'} : {color: '#e5e7eb'}} ><FontAwesomeIcon icon={faStar} /></button>
                            <button type='button' onClick={() => setRating(2)} style={rating >= 2 ? {color: 'yellow'} : {color: '#e5e7eb'}} className='text-gray-200'><FontAwesomeIcon icon={faStar} /></button>
                            <button type='button' onClick={() => setRating(3)} style={rating >= 3 ? {color: 'yellow'} : {color: '#e5e7eb'}} className='text-gray-200'><FontAwesomeIcon icon={faStar} /></button>
                            <button type='button' onClick={() => setRating(4)} style={rating >= 4 ? {color: 'yellow'} : {color: '#e5e7eb'}} className='text-gray-200'><FontAwesomeIcon icon={faStar} /></button>
                            <button type='button' onClick={() => setRating(5)} style={rating >= 5 ? {color: 'yellow'} : {color: '#e5e7eb'}} className='text-gray-200'><FontAwesomeIcon icon={faStar} /></button>
                        </div>
                        <div>
                            <button 
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200" 
                            type='submit' 
                            style={disabled ? disabledStyle : null}
                            disabled={disabled}>
                            Post
                            </button>
                        </div>
                    </div>
                </section>
            </form>
    )
}


export default ReviewPage