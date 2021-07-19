


import {createStore, combineReducers,applyMiddleware, compose} from 'redux'

import thunk from 'redux-thunk';


import userReducer from './reducers/userReducer'
import dataReducer from './reducers/dataReducer'
import uiReducer from './reducers/uiReducer'



function saveToLocalStorage(state) {
    try{
        const stateJson = JSON.stringify(state)
        localStorage.setItem('state',stateJson)
    } catch(e){
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try{
        const stateJson = localStorage.getItem('state')
        if(stateJson  === null) return undefined
        return JSON.parse(stateJson)
    } catch(e){
        console.log(e)
        return undefined
    }
}





const middleware = [thunk];

//user,data,UI will be objects stored in our state.     

const reducers = combineReducers({
    user: userReducer,
    data:dataReducer,
    UI: uiReducer,
})

//  const initialState = {};

const persistedState = loadFromLocalStorage()

//store , where we store the current data/state in or app
const store = createStore(reducers, persistedState, compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
//const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))


store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;