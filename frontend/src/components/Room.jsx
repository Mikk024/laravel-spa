import { Link } from 'react-router-dom'

const Room = ({price, address, roomId, handleDelete, image }) => {

    return (
        
            <div className="grid grid-cols-1 gap-6 border rounded-lg hover:-translate-y-1 hover:scale-105 duration-200 mb-4">
                <div className="grid grid-rows-3 md:grid-rows-1  md:grid-cols-3 gap-4">
                    <Link to={`/room/${roomId}`}>
                    <div>
                        <img src={image[0]?.image} alt="" className='rounded-lg h-52 object-cover w-full'/>
                    </div>
                    </Link>
                    <div className='space-y-6 pt-4'>
                        <p className="text-3xl">{address}</p>
                        <p className="text-xl">{price}</p>
                    </div>
                    <div className='py-4 space-y-6 text-center'>
                        <p className="text-2xl">Actions</p>
                        <Link to={`/room/${roomId}/edit`}><button type='button'  className='block mx-auto px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-800'>Edit</button></Link>
                        <button type='button'  className='block mx-auto px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-800' onClick={() => {handleDelete(roomId)}}>Delete</button>
                    </div>    
                </div>
            </div>
    )
}


export default Room