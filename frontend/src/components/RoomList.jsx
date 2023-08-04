import { Link } from "react-router-dom"
import Room from "./Room"

const RoomList = ({data, handleDelete}) => {

    const rooms = data.map(room => <Room price={room.price} address={room.address} roomId={room.id} handleDelete={handleDelete} image={room.images} />)

    const noRooms = <div>
        <p className="text-md md:text-5xl md:text-center">You don't rent any house <Link to='/rent' className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-500">Rent one now</Link></p>
    </div>

    return (
       <div>
            {rooms.length > 0 ? rooms : noRooms}
       </div>
    )
}

export default RoomList