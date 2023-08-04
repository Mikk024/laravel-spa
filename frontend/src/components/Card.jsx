import { Link } from 'react-router-dom';

const Card = ({ address, price, image, roomId }) => {
  return (
    <>
      <div>
        <Link to={`/room/${roomId}`}>
          <div className='rounded-lg object-cover hover:-translate-y-1 hover:scale-110 duration-200 space-y-2 capitalize'>
            <img src={image ? image[0]?.image : null} className='rounded-lg h-72 object-cover' alt='Room' />
            <p className='capitalize text-xl'>{address}</p>
            <p className='text-lg'>Price per night {price} $</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
