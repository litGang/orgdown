// @flow
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import routes from "./routes";
import configureStore from "./store/configureStore";
import "./app.global.css";
import db from "../main/database";
import {initNotebook, selectNotebook} from "./actions/note";

db.notebooks.find({}).sort({ createdAt: 1 }).exec(function (err, datas) {
    notebooks = datas;
    const store = configureStore(notebooks);
    store.dispatch(initNotebook(notebooks));
    db.config.findOne({key: 'currentNote'}, function(err, data) {
        notebooks.map((notebook) => {
            data.value == notebook._id && store.dispatch(selectNotebook(notebook));
        });
    });

    const history = syncHistoryWithStore(hashHistory, store);

    render(
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>,
        document.getElementById('root')
    );

});

// import aaa from './reducers/initState';
// db.notebooks.insert(aaa);
let notebooks = {};
