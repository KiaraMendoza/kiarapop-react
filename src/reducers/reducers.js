import { combineReducers } from 'redux';

import loginPageReducer from './login';

export default combineReducers({
    login: loginPageReducer,
});