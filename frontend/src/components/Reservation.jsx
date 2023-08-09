import { Link } from 'react-router-dom'

const Reservation = ({address, startDate, endDate, total, active, reservationId, roomId}) => {
    return (
        <div>
            <Link to={`/room/${roomId}`} className='text-xl'>
                <div className="grid md:grid-cols-6 gap-4 mt-8 border-b-4 py-4 hover:bg-gray-200 px-2 rounded-md">
                    <div>{address}</div>
                    <div>{startDate}</div>
                    <div>{endDate}</div>
                    <div>{total} $</div>
                    <div>{active ? 'Active' : 'Expired'}</div>
                    <div>{!active ? <Link to='/review' state={{data: reservationId}}><button className='bg-blue-400 hover:bg-blue-600 px-4 py-2 rounded-md text-gray-100'>Post a Review</button></Link> : null}</div>
                </div>
            </Link>
        </div>
    )
}

export default Reservation