import {createStore,applyMiddleware,compose} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
const middlewares = [thunk]
const enhancers = [applyMiddleware(...middlewares)]
let configureStore = createStore(rootReducer,compose(...enhancers))
export default configureStore