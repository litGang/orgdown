import {app, ipcMain, openSaveDialog, openFileDialog} from 'electron';
import window from "./window";
import menu from "./menu";

let mainMsgQueue = [];

const init = () => {
    const ipc = ipcMain;

    ipc.on('mainRenderReady', function (e) {
        app.mainRenderReady = true;

        // 暂存msg的queue
        mainMsgQueue.forEach(function (message) {
            if (window)
                window.send(...message);
        });

        mainMsgQueue.length = 0;
        console.log('mainRenderReady ............');
    });

    ipc.on('onNotebookContainer', (event, arg) => {
        menu.onNotebookContainer();
    });

    ipc.on('onEditNote', (event, arg) => {
        menu.onEditNote();
    });

    ipc.on('onEditTrash', (event, arg) => {
        menu.onEditTrash();
    });

    ipc.on('onNoEditNotesList', (event, arg) => {
        menu.onNoEditNotesList();
    });

    ipc.on('enableItem', (event, item) => {
        menu.enableItem(item);
    });

    ipc.on('disableItem', (event, item) => {
        menu.disableItem(item);
    });

    // a bridge between other window to main
    ipc.on('mainCmd', (event, ...args) => {
        if (window.win)
            return window.dispatch(...args);
        window.init();
        window.dispatch(...args);
    });

    // open save dialog
    ipc.on('saveDialog', (...args) => {
        openSaveDialog(...args);
    });

    ipc.on('openFile', (...args) => {
        openFileDialog(...args);
    });
};

exports.mainMsgQueue = mainMsgQueue;
exports.init = init;