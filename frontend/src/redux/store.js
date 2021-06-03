import { createStore, combineReducers, applyMiddleware } from 'redux';
import articleReducer from './articles/articleReducer';
import connectedReducer from './connectedReducer/connectedReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    articleReducer,
    connectedReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;