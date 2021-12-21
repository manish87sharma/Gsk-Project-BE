// const Datastore = require('nedb');
const Datastore = require('nedb-promises')
// const db= new Datastore({ filename: 'db.json'});
let db = {
     employees: Datastore.create('employee.db'),
     projects: Datastore.create('project.db')
};


export default db;

