import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

/** v3 imports */

import reducers from './reducers';
import ProtectedRoute from './routing/ProtectedRoute';
import Portal from './routing/Portal';
import LoginPage from './pages/Login/LoginPage';
import PasswordRegistration from './pages/Login/PasswordRegistration';
import Sandbox from './pages/Sandbox/Sandbox';
import Sandbox2 from './pages/Sandbox/Sandbox2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.scss';
import App from './App';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, ReduxPromise)(createStore);
const browserHistory = Router.browserHistory;

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}>
			<App>
				<Switch>
					<Route exact path='/login' component={LoginPage} />
					<Route path='/passwordRegistration/:code+' component={PasswordRegistration} />
					<ProtectedRoute path='/portal' component={Portal} />
					<Route exact path='/' component={LoginPage} />
					<Route exact path='/sandbox' component={Sandbox} />
					<Route exact path='/sandbox2' component={Sandbox2} />
				</Switch>
			</App>
		</Router>
	</Provider>,
	document.querySelector('#root'),
);

registerServiceWorker();
