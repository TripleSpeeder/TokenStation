import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'
// Logger with default options
import logger from 'redux-logger'

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

const store = createStore(
    reducer,
    applyMiddleware(
        thunk,
        logger,
    )
);

export default store
export const history = createHistory()
