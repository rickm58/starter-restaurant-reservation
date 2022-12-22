import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { readReservation, updateReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";


function EditReservation({ forceRerender, setForceRerender }) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  }

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { reservation_id } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      try {
        const reservationFromAPI = await readReservation(reservation_id, abortController.signal);
        setFormData({
          ...reservationFromAPI,
          reservation_date: formatAsDate(reservationFromAPI.reservation_date),
        });
      } catch (error) {
        setError(error);
      }
    }

    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleChange = ({ target }) => {
    const fieldValue = (target.id === 'people') ? target.valueAsNumber : target.value
    setFormData({
      ...formData,
      [target.name]: fieldValue, 
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function updateRes() {
      try {
        await updateReservation(formData, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
        setForceRerender(!forceRerender);
      } catch (error) {
        setError(error);
      }
    }

    updateRes();
    return () => abortController.abort();
  }

  const cancelHandler = () => {
    history.push(`/dashboard?date=${formData.reservation_date}`);
  }

  return (
    <div>
      <h2>Edit Reservation {reservation_id}</h2>
      <ErrorAlert error={error} />
      <ReservationForm 
        handleSubmit={handleSubmit} 
        handleChange={handleChange} 
        cancelHandler={cancelHandler} 
        formData={formData} 
      />
    </div>
  )
}

export default EditReservation;