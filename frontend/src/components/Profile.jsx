import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons"

const Profile = ({data}) => {
    return (
        <div className="space-y-6">
            <p className="text-7xl mb-12">User's Details</p>
            {data.profile_image ? <img src={data.profile_image} alt="" className="rounded-full h-64 w-72 object-cover mx-auto" /> : <p className="text-9xl"><FontAwesomeIcon icon={faUser} /></p>}
            <p className="text-4xl">{data.name}</p>
            <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faEnvelope} /><span className="text-black"> {data.email}</span></p>
            <p className="text-2xl text-red-400"><FontAwesomeIcon icon={faPhone} /><span className="text-black"> {data.phone}</span></p>
        </div>
    )
}

export default Profile