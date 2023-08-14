import { useState } from 'react'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

const RentPage = () => {

    const [totalOccupants, setTotalOccupants] = useState()
    const [totalBedrooms, setTotalBedrooms] = useState()
    const [totalBathrooms, setTotalBathrooms] = useState()
    const [address, setAddress] = useState()
    const [hasTv, setHasTv] = useState(false)
    const [hasKitchen, setHasKitchen] = useState(false)
    const [hasInternet, setHasInternet] = useState(false)
    const [hasHeating, setHasHeating] = useState(false)
    const [hasAirCon, setHasAirCon] = useState(false)
    const [price, setPrice] = useState()
    const [images, setImages] = useState([])
    const [errors, setErrors] = useState([])
    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate()
    

    const formHandler = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('total_occupancy', totalOccupants);
        formData.append('total_bedrooms', totalBedrooms);
        formData.append('total_bathrooms', totalBathrooms);
        formData.append('address', address);
        formData.append('has_tv', hasTv.toString());
        formData.append('has_kitchen', hasKitchen.toString());
        formData.append('has_internet', hasInternet.toString());
        formData.append('has_heating', hasHeating.toString());
        formData.append('has_air_con', hasAirCon.toString());
        formData.append('price', price);
        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
          }
        setDisabled(true)
        try {
            const response = await axios.post('api/v1/rooms/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response)
            navigate('/')
        } catch (e) {
            setDisabled(false)
            console.log(e)
            if (e.response.status === 422) {
                setErrors(e.response.data.errors)
            }
        }
    }
    const active = {
        backgroundColor: 'black',
        transition: "all .2s ease",
        color: 'white'
    }

    const disabledStyle = {
        backgroundColor: 'gray',
        transition: 'all .2s ease',
        color: 'white'
    }

    return (
            <form onSubmit={formHandler}>
                <section className="flex justify-center items-center min-h-screen my-52 py-8">
                    <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
                        <div className="mb-4">
                            <p className="text-gray-600 text-2xl">Rent Your House</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Total Occupants" value={totalOccupants} onChange={e => setTotalOccupants(e.target.value)}/>
                            <p className="text-red-500">{errors.total_occupancy ? errors.total_occupancy : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Total Bedrooms" value={totalBedrooms} onChange={e => setTotalBedrooms(e.target.value)}/>
                            <p className="text-red-500">{errors.total_bedrooms ? errors.total_bedrooms : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Total Bathrooms" value={totalBathrooms} onChange={e => setTotalBathrooms(e.target.value)}/>
                            <p className="text-red-500">{errors.total_bathrooms ? errors.total_bathrooms : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)}/>
                            <p className="text-red-500">{errors.address ? errors.address : null}</p>
                        </div>
                        <div className='space-x-4'>
                            <label htmlFor="" className='bg-gray-50 p-4 rounded text-gray-600 text-sm border border-gray-200'>Has TV?</label>
                            <button type='button' className='px-8 py-4 border rounded' style={hasTv ? null : active} onClick={() => setHasTv(false)}>No</button>
                            <button type='button' className='px-8 py-4 border rounded' style={hasTv ? active : null} onClick={() => setHasTv(true)}>Yes</button>
                        </div>
                        <div className='space-x-4'>
                            <label htmlFor="" className='bg-gray-50 p-4 rounded text-gray-600 text-sm border border-gray-200'>Has AC?</label>
                            <button type='button' className='px-8 py-4 border rounded' style={hasAirCon ? null : active} onClick={() => setHasAirCon(false)}>No</button>
                            <button type='button' className='px-8 py-4 border rounded' style={hasAirCon ? active : null} onClick={() => setHasAirCon(true)}>Yes</button>
                        </div>
                        <div className='space-x-4'>
                            <label htmlFor="" className='bg-gray-50 p-4 rounded text-gray-600 text-sm border border-gray-200'>Has Kitchen?</label>
                            <button type='button' className='px-8 py-4 border rounded' style={hasKitchen ? null : active} onClick={() => setHasKitchen(false)}>No</button>
                            <button type='button' className='px-8 py-4 border rounded' style={hasKitchen ? active : null} onClick={() => setHasKitchen(true)}>Yes</button>
                        </div>
                        <div className='space-x-4'>
                            <label htmlFor="" className='bg-gray-50 p-4 rounded text-gray-600 text-sm border border-gray-200'>Has Internet?</label>
                            <button type='button' className='px-8 py-4 border rounded' style={hasInternet ? null : active} onClick={() => setHasInternet(false)}>No</button>
                            <button type='button' className='px-8 py-4 border rounded' style={hasInternet ? active : null} onClick={() => setHasInternet(true)}>Yes</button>
                        </div>
                        <div className='space-x-4'>
                            <label htmlFor="" className='bg-gray-50 p-4 rounded text-gray-600 text-sm border border-gray-200'>Has Heating?</label>
                            <button type='button' className='px-8 py-4 border rounded' style={hasHeating ? null : active} onClick={() => setHasHeating(false)}>No</button>
                            <button type='button' className='px-8 py-4 border rounded' style={hasHeating ? active : null} onClick={() => setHasHeating(true)}>Yes</button>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)}/>
                            <p className="text-red-500">{errors.price ? errors.price : null}</p>
                        </div>
                        <div>
                            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="file" multiple onChange={e => setImages(e.target.files)}/>
                            <p className="text-red-500">{errors.images ? errors.images : null}</p>
                        </div>
                        <div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200" type='submit' style={disabled ? disabledStyle : null} disabled={disabled}>Rent</button>
                        </div>
                    </div>
                </section>
            </form>
    )
}

export default RentPage