import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = ({query, handleQuery}) => {


    return (
        <div className='space-x-2 flex justify-center'>
            <input type="text" className='rounded-full bg-gray-100 px-10' placeholder='Address' value={query} onChange={handleQuery}/>
        </div>
    )
}

export default Search