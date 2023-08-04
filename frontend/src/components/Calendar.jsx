import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../api/axios';
import useAuthContext from '../context/AuthContext';

function Calendar({ price, id, disabledDates }) {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [fullPrice, setFullPrice] = useState(0);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;

    const numberOfDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const totalPayment = numberOfDays * price;
    setFullPrice(totalPayment);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      if (window.confirm('Are you sure?')) {
        try {
          const response = await axios.post('api/v1/reservations/store', {
            room_id: id,
            price: price,
            start_date: dateRange[0].startDate,
            end_date: dateRange[0].endDate,
          });
          navigate('/')
        } catch (e) {
          console.log(e);
        }
      }
    }
    if (!user) {
      alert('You have to be logged in!');
      navigate('/login');
    }
  };

  return (
    <div className="md:w-full">
      <div className="mx-auto w-11/12 md:w-2/3">
        <DateRange
          ranges={dateRange}
          onChange={handleSelect}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          direction={window.innerWidth <= 768 ? "vertical" : "horizontal"}
          minDate={new Date()}
          disabledDates={disabledDates.map((date) => new Date(date))}

        />
        <div className="flex text-xl mt-4">
          <p className="px-4">
            {dateRange[0].startDate.getDate()}-{dateRange[0].startDate.getMonth()}-{dateRange[0].startDate.getFullYear()}
          </p>
          <p className="px-4">
            {dateRange[0].endDate.getDate()}-{dateRange[0].endDate.getMonth()}-{dateRange[0].endDate.getFullYear()}
          </p>
        </div>
        <p className="text-2xl">Total price: {fullPrice} $</p>
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600"
          >
            Rent
          </button>
        </form>
      </div>
    </div>
  );
}

export default Calendar;
