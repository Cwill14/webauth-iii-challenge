const db = require('../data/dbConfig.js');

module.exports = {
    getUsers,
    getByFilter,
    addUser,
    findById
}

function getUsers() {
    return db('users').select('id', 'username', 'department');
}

function getByFilter(filter) {
    return db('users').where(filter);
}

function addUser(user) {
    return db('users').insert(user);
}
// async function addUser(user) {
//     const [id] = await db('users').insert(user);
//     return findById(id);
// }

function findById(id) {
    return db('users')
      .where({ id })
      .first();
  }
