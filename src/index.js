import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { log } from './services/Mixpanel';

import App from './App';
import ProtectedRoute from './components/Common/ProtectedRoute';
import LoginPage from './components/Login/LoginPage';
import PasswordRegistration from './components/Login/PasswordRegistration';
import Portal from './containers/Portal';
import Sandbox from './components/Sandbox';
import Sandbox2 from './components/Sandbox2';
import ButtonTester from './components/Common/ButtonTester';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.scss';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, ReduxPromise)(createStore);
const browserHistory = Router.browserHistory;

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory} log={log}>
			<App>
				<Switch>
					<Route exact path='/login' component={LoginPage} />
					<Route path='/passwordRegistration/:code+' component={PasswordRegistration} />
					<ProtectedRoute path='/portal' component={Portal} />
					<Route exact path='/' component={LoginPage} />
					<Route exact path='/sandbox' component={Sandbox} />
					<Route exact path='/sandbox2' component={Sandbox2} />
					<Route exact path='/buttontest' component={ButtonTester} />
				</Switch>
			</App>
		</Router>
	</Provider>,
	document.querySelector('#root'),
);

registerServiceWorker();
