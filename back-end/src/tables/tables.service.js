const knex = require("../db/connection");


function create(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}

function update(updatedTable) {
  return knex("tables")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
}

function read(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .first();
}


module.exports = {
  create,
  list,
  update,
  read,
}