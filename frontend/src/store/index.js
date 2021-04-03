import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import splashReducer from './splash';
import commentReducer from './comment';
import profileReducer from './profile';
import searchReducer from './search';



const rootReducer = combineReducers({
  session: sessionReducer,
  splashReducer: splashReducer,
  commentReducer: commentReducer,
  profileReducer: profileReducer,
  searchReducer: searchReducer,
});


let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
