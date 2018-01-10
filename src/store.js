import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'

const reducer = combineReducers(
    Object.assign({},
        {
            web3Instance,
            tokens,
            addresses,
            balance,
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
