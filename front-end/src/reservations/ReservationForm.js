import React from "react";


function ReservationForm({ handleSubmit, handleChange, cancelHandler, formData }) {
  return (
    <form onSubmit={handleSubmit} className="col-auto">
      <label htmlFor="first_name">
        First Name:
      </label>
      <input
        id="first_name"
        type="text"
        className="form-control"
        placeholder="ex: John"
        name="first_name"
        onChange={handleChange}
        value={formData.first_name}
      />
      <br />
      <label htmlFor="last_name">
        Last Name:
      </label>
      <input
        id="last_name"
        type="text"
        className="form-control"
        placeholder="ex: Smith"
        name="last_name"
        onChange={handleChange}
        value={formData.last_name}
      />
      <br />
      <label htmlFor="mobile_number">
        Phone Number:
      </label>
      <input
        id="mobile_number"
        type="tel"
        className="form-control"
        placeholder="xxx-xxx-xxxx"
        name="mobile_number"
        onChange={handleChange}
        value={formData.mobile_number}
      />
      <br />
      <label htmlFor="reservation_date">
        Reservation Date:
      </label>
      <input
        id="reservation_date"
        type="date"
        className="form-control"
        name="reservation_date"
        onChange={handleChange}
        value={formData.reservation_date}
      />
      <br />
      <label htmlFor="reservation_time">
        Reservation Time:
      </label>
      <input
        id="reservation_time"
        type="time"
        className="form-control"
        name="reservation_time"
        onChange={handleChange}
        value={formData.reservation_time}
      />
      <br />
      <label htmlFor="people">
        Party Size:
      </label>
      <input
        id="people"
        type="number"
        min="1"
        max="20"
        className="form-control"
        name="people"
        onChange={handleChange}
        value={formData.people}
      />
      <br />
      <div className="text-center">
        <button type="button" className="btn btn-outline-secondary mb-4 mx-2" onClick={cancelHandler}>Cancel</button>
        <button type="submit" className="btn btn-outline-info mb-4 mx-2">Submit</button>
      </div>
    </form>
  );
}


export default ReservationForm;