import React from 'react';
import { createStore } from 'redux';
import Counter from '../components/Counter';
import countReducer from '../reducers/countReducer';

const store = createStore(countReducer);

var CounterContainer = function () {
	return (
		<Counter
			value={store.getState()}
			onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
			onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
		/>
	)
}

export default CounterContainer;