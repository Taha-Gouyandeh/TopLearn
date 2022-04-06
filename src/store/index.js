import { loadingBarMiddleware } from "react-redux-loading-bar";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getAllCourses } from "../actions/courses";
import { reducers } from "../reducers";

// const reduxDevTools=window.__REDUX_DEVTOOLS_EXTENSION__ &&
// window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(thunk,loadingBarMiddleware()),
        // reduxDevTools
    )
);

//inittialize
store.dispatch(getAllCourses());

//subscribe
// store.subscribe(()=>console.log(store.getState));