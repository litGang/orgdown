import {app, BrowserWindow} from "electron";
import menu from "./menu";
import mainMsgQueue from "./event";

const main = module.exports = {
	init,
	show,
	hide,
	send,
	dispatch,
	win: null
};

function init() {
	if (main.win) {
		return main.win.show();
	}

	let win = main.win = new BrowserWindow({
		width: 1600,
		height: 768,
		name: 'orgdown',
		show: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			webSecurity: false
		}
	});

	win.once('ready-to-show', () => {
		show();
		// menu.enableItem('New Notebook');
	});

	// and load the index.html of the app.
	win.loadURL(`file://${__dirname}/../src/index.html`);
	// win.loadURL(`file://${path.resolve(__dirname, '../app/app.html')}`);

	// Open the DevTools.
	// win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on('closed', function () {
		win = main.win = null;
		mainMsgQueue.length = 0;
		app.mainRenderReady = false;
		// menu.onNoMainWin();
	})
}

function show() {
	if (!main.win)
		return;
	main.win.show();
}

function hide() {
	if (!main.win)
		return;
	main.win.hide();
}

function send(...args) {
	if (!main.win || !app.mainRenderReady) {
		mainMsgQueue.push(args);
	} else {
		main.win.send(...args);
	}
}

// dispath a event to render process
// 处于给render process 发送事件dispatch，并且处理.
function dispatch(...args) {
	send('dispatch', ...args);
}
