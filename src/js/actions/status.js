import { push } from 'react-router-redux';

export function loadStatus (path, token) {
	return function (dispatch) {
		// push('/');
		// history.push('/status');
		// // Check and wait for appliance to be done initializing or updating
		// var initTimer = setInterval(() => {
		// 	getStatus()
		// 		.then(status => {
		// 			if ('initializing' !== status.state && 'updating' !== status.state) {
		// 				clearInterval(initTimer);
		// 				dispatch(statusInitialized(status.state));
		// 				if (! token) {
		// 					history.push('/login');
		// 				} else if ('initialized' === status.state) {
		// 					history.push('/settings/edit');
		// 				} else {
		// 					dispatch(navEnable('/' !== path));
		// 					history.push(path || '/dashboard');
		// 				}
		// 			} else {
		// 				dispatch(statusProgress(status.percent));
		// 				history.replace('/status');
		// 			}
		// 		})
		// 		.catch(error => console.log('!!! loadStatus', error));
		// 	// ///// Simulate success for now, since the real appliance doesn't
		// 	// handle status checking
		// 	// .then(() => { /////
		// 	//   dispatch(initialized('ready'));
		// 	//   clearInterval(initTimer);
		// 	// });
		// }, pollingInterval);
	};
}