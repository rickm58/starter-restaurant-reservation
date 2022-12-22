const knex = require("../db/connection");


// posts a new reservation
function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

// lists all reservations by date, sorted by time
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time");
}

// reads a reservation given a reservation_id
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

// updates a reservation status
function update(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updated) => updated[0]);
}

// searches for reservations matching the phone number, regardless of status
function search(mobile_number) {
  return knex("reservations")
  .whereRaw(
    "translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`
  )
  .orderBy("reservation_date");
}

module.exports = {
  list,
  create,
  read,
  update,
  search,
}