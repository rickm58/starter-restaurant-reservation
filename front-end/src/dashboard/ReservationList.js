import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";

function ReservationList({ reservation }) {
  const history = useHistory();
  
  const handleCancel = (event) => {
    event.preventDefault();
    const userResponse = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
    if (userResponse) {
      const abortController = new AbortController();
      async function update() {
        try {
          await updateReservationStatus("cancelled", reservation.reservation_id, abortController.signal);
          history.push("/");
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }

      update();
      return () => abortController.abort();
    }
  }
  
  return (
    <div className="card col-sm-8 col-md-7 col-lg-6 m-auto">
      <div className="card-body">
        <h5 className="card-title ">{reservation.first_name} {reservation.last_name}</h5>
        <h6 className="card-subtitle mb-2 text-muted" >Phone Number: {reservation.mobile_number}</h6>
        <p className="card-text">Time: {reservation.reservation_time}</p>
        <p className="card-text">
          Party Size: {reservation.people}
        </p>
        <p data-reservation-id-status={reservation.reservation_id}>
          Status: {reservation.status}
        </p>
        {reservation.status === "booked" &&
          <>
            <Link className="btn btn-outline-info" to={`/reservations/${reservation.reservation_id}/seat`}>
              Seat
            </Link>
            <Link className="btn btn-outline-warning mx-2" to={`/reservations/${reservation.reservation_id}/edit`}>
              Edit
            </Link>
            <button className="btn btn-outline-secondary" onClick={handleCancel} data-reservation-id-cancel={reservation.reservation_id}>
              Cancel
            </button>
          </>
        }
      </div>
    </div>
  )
}


export default ReservationList;