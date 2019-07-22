// store index
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers, { RootState } from '../reducers';
import * as actions from "../actions";
import epics from '../epics';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const middlewares = [
  epicMiddleware,
];

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
);

const store = createStore(
  reducers,
  enhancer,
);

epicMiddleware.run(epics);
export default store;
