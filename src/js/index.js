import '../style/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

let element = document.getElementById('content');

ReactDOM.render((
	<App/>
), element);

document.body.classList.remove('loading');

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./App', () => {
		const NextApp = require('./App').default;
		ReactDOM.render(
			<AppContainer>
				<NextApp/>
			</AppContainer>,
			element
		);
	});
}
