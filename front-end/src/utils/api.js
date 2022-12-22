/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservations.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservations saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}


/**
 * Saves a new reservation to the database 
 * @param reservation
 *  the reservation to save, which must not have an 'id' property
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves the saved reservation, which now stores an 'id' property
 */

export default async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };

  return await fetchJson(url, options);
}


/**
 * Saves a new table to the database
 * @param table
 *  the table to save
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<table>}
 *  a promise that resolves the saved table
 */

export async function createTable(table, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };

  return await fetchJson(url, options);
}


/**
 * Retrieves all existing tables.
 * @returns {Promise<[tables]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);

  return await fetchJson(url, { headers, signal }, [])
}


/**
 * 
 * @param table_id 
 *  the table id
 * @param reservation_id
 *  the reservation id 
 * @param signal 
 *  optional AbortController.signal
 * @returns {Promise<table>}
 *  a promise that resolves to the updated table
 */

export async function updateSeatReservation(table_id, reservation_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id: reservation_id } }),
    signal,
  };
  return await fetchJson(url, options);
}


/**
 * Finishes table by sending delete request to the specified table to remove reservation_id
 * @param table_id 
 *  the table id with the reservation_id to delete
 * @param signal 
 *  optional AbortController.signal
 * @returns {Promise<table>}
 *  a promise that resolves to the updated table
 */

export async function finishTable(table_id, signal) {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
    headers,
    signal,
  };
  return await fetchJson(url, options);
}


/**
 * Searches the current list of reservations for the matching phone number
 * @param phone_number
 *  the phone number to search
 * @param signal 
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves to the reservation
 */

export async function searchReservations(mobile_number, signal) {
  const url = `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`;
  return await fetchJson(url, { signal } );
}


/**
 * Updates the reservation status
 * @param status
 *  the status to change
 * @param reservation_id
 *  the reservation id to update
 * @param signal 
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves to the saved reservation
 */
export async function updateReservationStatus(status, reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { status: status } }),
    signal,
  };
  return await fetchJson(url, options)
}


/**
 * Retrieves a reservation from the database
 * @param reservation_id
 *  the reservation id to read
 * @param signal
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves to the retrieved reservation 
 */

export async function readReservation(reservation_id, signal) {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  return await fetchJson(url, { signal }, []);
}

/**
 * Updates a reservation 
 * @param updatedReservation
 *  the updated reservation information
 * @signal
 *  optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves to the updated reservation
 */

export async function updateReservation(updatedReservation, signal) {
  const url = `${API_BASE_URL}/reservations/${updatedReservation.reservation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: updatedReservation }),
    signal,
  };
  return await fetchJson(url, options)
}