import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Review = ({user, comment, rating}) => {
    return (
        <div className='grid grid-cols-2 gap-4 rounded-md h-64 p-4'>
            <div className='space-y-2'>
                <img src={user.profile_image} alt="thumbnail" className='rounded-full h-20 object-cover'/>
                <Link to={`/user/${user.id}`}><p className='text-2xl underline'>{user.name}</p></Link>
            </div>
            <p className='text-center text-2xl text-yellow-300'><FontAwesomeIcon icon={faStar}/><span className='text-black'>{rating}</span></p>
            <div className='col-span-2 mt-2'>
                {comment} 
            </div>
        </div>
    )
}

export default Review