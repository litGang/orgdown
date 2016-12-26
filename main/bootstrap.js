import {app} from "electron";
import event from "./event";
import menu from "./menu";
import window from "./window";

function init() {
    app.on('ready', function () {
        window.init();
        menu.init();
    });
}

let shouldQuit = false;

if (!shouldQuit) {
    shouldQuit = app.makeSingleInstance(onAppOpen);
    if (shouldQuit) {
        app.quite();
    }
}

if (!shouldQuit) {
    init();
}

event.init();

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (window.win === null) {
        window.init();
    }
});

function onAppOpen() {
    if (app.ipcReady) {
        window.show();
    }
}