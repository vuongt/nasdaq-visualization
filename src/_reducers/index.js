import { combineReducers } from 'redux';
import { nasdaq } from './nasdaq.reducer';

const rootReducer = combineReducers({
    nasdaq
});

export default rootReducer;