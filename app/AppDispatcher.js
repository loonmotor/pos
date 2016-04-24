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
			err => {
				console.log('holala');
				console.log(err);
				this.dispatch({ type : error, payload : Object.assign({}, payload, {error : err}) });
			}
		);
	}
}

export default new AppDispatcher();

