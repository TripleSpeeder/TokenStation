import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {queryAddress} from "./modules/address/reducers/addressByIdReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'

const reducer = combineReducers(
    Object.assign({},
        {
            web3Instance,
            tokens,
            addresses,
        }
    )
)

const logStateMiddleware = ({dispatch, getState}) => next => action => {
    console.log(action.type, getState())
    next(action)
}

const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        logStateMiddleware,
    )
);

export default store
export const history = createHistory()
