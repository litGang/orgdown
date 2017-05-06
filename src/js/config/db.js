import Datastore from 'nedb';
const app = require('electron').remote.app

let storePath = app.getPath("userData");
let db = {};

db.notebooks = new Datastore({
  filename: `${storePath}/data/notebook.db`,
  timestampData: true
});

db.nodes = new Datastore({
  filename: `${storePath}/data/nodes.db`,
  timestampData: true
});

// You need to load each database (here we do it asynchronously)
db.notebooks.loadDatabase();
db.nodes.loadDatabase();

export default db;
