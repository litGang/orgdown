import fs from "fs";
const remote = require('electron').remote;
const app = remote.app,
    Datastore = require('nedb'),
    db = {};

import initState from '../app/reducers/initState';

let constants = {};

constants.NOTE_PATH = app.getPath('userData') + '/data/notes';
constants.DOC_PATH = app.getPath('userData') + '/data/docs';
constants.CONFIG_PATH = app.getPath('userData') + '/data/config';

db.notebooks = new Datastore({
    filename: constants.NOTE_PATH,
    autoload: true,
    timestampData: true
});

db.docs = new Datastore({
    filename: constants.DOC_PATH,
    autoload: true,
    timestampData: true
});

db.config = new Datastore({
    filename: constants.CONFIG_PATH,
    autoload: true,
    timestampData: true
});

db.notebooks.ensureIndex({fieldName: 'updatedAt'});
db.docs.ensureIndex({fieldName: 'updatedAt'});

db.notebooks.ensureIndex({fieldName: '_id', unique: true}, function (err) {
});

if (!fs.exists(constants.NOTE_PATH)) {
    initState.notes.map((note) => {
        db.notebooks.insert(note);
    });
}



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
