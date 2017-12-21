import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tokens} from "./reducers/tokenReducer"
import {queryAddress} from "./reducers/queryAddressReducer"
import {web3Instance} from "./reducers/web3Reducer"


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

const store = createStore(reducer, applyMiddleware(
    logStateMiddleware
));

export default store