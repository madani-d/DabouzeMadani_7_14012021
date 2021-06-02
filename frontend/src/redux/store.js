import { createStore, combineReducers, applyMiddleware } from 'redux';
import articleReducer from './articles/articleReducer';
import commentReducer from './comment/commentReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    articleReducer,
    commentReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;