import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {queryAddress} from "./modules/queryAddress/queryAddressReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

const reducer = combineReducers(
    Object.assign({},
        {
            queryAddress,   // ES6 shorthand for "queryAddress: queryAddress"
            web3Instance,
            tokens,
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
