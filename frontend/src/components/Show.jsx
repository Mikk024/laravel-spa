import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv, 
    faTemperatureArrowDown,
    faKitchenSet,
    faWifi,
    faTemperatureArrowUp,
    faCheck,
    faXmark
 } from '@fortawesome/free-solid-svg-icons'
import Calendar from './Calendar'
import ReviewList from './ReviewList'


const Show = ({data, reviews, disabledDates}) => {

    const images = data.images?.map(image => <img src={image.image} className='rounded-xl w-full h-96 object-cover' />)

    return (
        <div className="mt-16 px-32">
            <div className="grid grid-cols-2 gap-4">
               {images}
            </div>
            <div className='mb-20'>
                <p className="text-2xl">{data.address}</p>
                <p className="text-lg text-gray-400 border-b-2 border-bottom pb-8">{data.total_occupancy} Guests | {data.total_bedrooms} {data.total_bedrooms !== 1 ? 'Bedrooms' : 'Bedroom'} | {data.total_bathrooms} {data.total_bathrooms !== 1 ? 'Bathrooms' : 'Bathroom'}</p>
                <p className="text-3xl mt-4">Description</p>
                <p className="text-lg text-gray-400 mt-4 pb-8 border-b-2">Nisi ad duis ad cillum. Dolor aliquip laboris anim cillum eu consectetur culpa exercitation duis amet non officia ad. In veniam tempor sint ea enim officia nisi magna irure sit Lorem dolore. Culpa sit laboris et ex id occaecat. Laborum aliqua sunt magna est consectetur esse consectetur voluptate duis. Sint dolor in elit reprehenderit adipisicing commodo esse duis.</p>
                <p className="text-3xl my-4">Equipment</p>
                <div className="space-y-6 pb-8 border-b-2">
                    <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faTv} /> | <span className='text-black'>TV</span>{data.has_tv ? <span className="text-green-500">  <FontAwesomeIcon icon={faCheck} /></span> : <span className='text-red-500'>  <FontAwesomeIcon icon={faXmark} /></span>}</p>
                    <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faTemperatureArrowDown} /> | <span className="text-black">Air Condition</span>{data.has_air_con ? <span className="text-green-500">  <FontAwesomeIcon icon={faCheck} /></span> : <span className='text-red-500'>  <FontAwesomeIcon icon={faXmark} /></span>}</p>
                    <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faKitchenSet} /> | <span className="text-black">Kitchen</span>{data.has_kitchen ? <span className="text-green-500">  <FontAwesomeIcon icon={faCheck} /></span> : <span className='text-red-500'>  <FontAwesomeIcon icon={faXmark} /></span>}</p>
                    <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faWifi} /> | <span className="text-black">Wi-fi</span>{data.has_internet ? <span className="text-green-500">  <FontAwesomeIcon icon={faCheck} /></span> : <span className='text-red-500'>  <FontAwesomeIcon icon={faXmark} /></span>}</p>
                    <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faTemperatureArrowUp} /> | <span className="text-black">Heating</span>{data.has_heating ? <span className="text-green-500">  <FontAwesomeIcon icon={faCheck} /></span> : <span className='text-red-500'>  <FontAwesomeIcon icon={faXmark} /></span>}</p>
                </div>
                <p className="text-3xl mt-4">Reviews</p>
                <div className="grid grid-cols-2 gap-8 mt-4 pb-8 border-b-2">
                    {reviews.length > 0 ? <ReviewList data={reviews}/> : <p className='text-xl'>There are no reviews for this room.</p>}
                </div>
                <p className="text-3xl my-4">Select check-in and checkout date</p>
                <div className="flex justify-center mt-6">
                    <Calendar price={data.price} id={data.id} disabledDates={disabledDates}/>
                </div>
            </div>
        </div>
    )
}

export default Show