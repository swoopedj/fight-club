var path = require('path');

var db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: process.env.NODE_ENV === 'test'
              ? ':memory:' // Use in-memory storage for test suite
              : path.join(__dirname, '../db/fightClub.sqlite')
  }
});

module.exports = db;
