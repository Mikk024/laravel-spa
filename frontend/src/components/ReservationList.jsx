import Reservation from "../components/Reservation"

const ReservationList = ({data}) => {

    const reservations = data.map(reservation => <Reservation address={reservation.room.address} startDate={reservation.start_date} endDate={reservation.end_date} total={reservation.total} active={reservation.active} reservationId={reservation.id} roomId={reservation.room.id} />)

    console.log(data)

    return (
        <div>
            {reservations}
        </div>
    )
}

export default ReservationList