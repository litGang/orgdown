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

module.exports = db;
