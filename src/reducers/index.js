import { combineReducers } from 'redux';
import localUserReducer from './localUserReducer';

const rootReducer = combineReducers({ 
	localUser:localUserReducer,
});

export default rootReducer;


