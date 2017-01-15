import fs from "fs";
const remote = require('electron').remote;
const app = remote.app,
    Datastore = require('nedb'),
    db = {};

let constants = {};

constants.NODE_PATH = app.getPath('userData') + '/data/nodes';

db.nodes = new Datastore({
    filename: constants.NODE_PATH,
    autoload: true,
    timestampData: true
});
db.nodes.ensureIndex({fieldName: 'updatedAt'});
db.nodes.ensureIndex({fieldName: '_id', unique: true}, function (err) {});


// if (!fs.exists(constants.NODE_PATH)) {
//     db.nodes.insert({_id: 'root', name: 'root', type: 'folder'});
//     db.nodes.insert({name: 'Java', type: 'folder', parent: 'root'});
//     db.nodes.insert({name: 'Spring笔记', type: 'file', parent: 'root', fileType: 'markdown'});
// }

module.exports = db;
