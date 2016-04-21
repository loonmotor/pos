import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
	dispatch (action = {}) {
		console.log('Dispatched:', action);
		super.dispatch(action);
	}
	dispatchAsync (promise, actionNames, payload) {
		const {request, success, error} = actionNames;
		this.dispatch({ type : request, payload : Object.assign({}, payload) });
		promise.then(
			response => this.dispatch({ type : success, payload : Object.assign({}, payload, {response} )}),
			error => this.dispatch({ type : error, payload : Object.assign({}, payload, {error}) })
		);
	}
}

export default new AppDispatcher();

