import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { searchReservations } from "../utils/api";
import ReservationList from "../dashboard/ReservationList";
import ErrorAlert from "../layout/ErrorAlert";


function Search() {
  const initialFormState = {
    mobile_number: ""
  }

  const [formData, setFormData] = useState(initialFormState);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function findReservations() {
      try {
        const matchingReservations = await searchReservations(formData.mobile_number, abortController.signal);
        setReservations(matchingReservations);
      } catch(error) {
        setError(error);
      }
    }

    findReservations();
    return () => abortController.abort();
  }

  const cancelHandler = () => {
    history.goBack();
  }
  
  return (
    <div>
      <h1 className="text-center text-info">Search Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={handleSubmit} className="col-auto">
        <label htmlFor="mobile_number">
          Mobile Number:
        </label>
        <input
          name="mobile_number" 
          id="mobile_number"
          type="text"
          placeholder="xxx-xxx-xxxx"
          className="form-control"
          onChange={handleChange}
          value={formData.mobile_number}
        />
        <br />
        <div className="text-center">
          <button type="button" className="btn btn-outline-secondary mb-4 mx-2" onClick={cancelHandler}>Cancel</button>
          <button type="submit" className="btn btn-outline-info mb-4 mx-2">Find</button>
        </div>
        <br />
        {reservations.length ? <h5>Results</h5> : <p>No reservations found</p>}
        {reservations && reservations.map((reservation) => (
          <ReservationList key={reservation.reservation_id} reservation={reservation} />
        ))}
      </form>
    </div>
  )
}


export default Search;