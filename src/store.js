import {createStore, combineReducers, applyMiddleware} from 'redux'
import {queryAddress, web3Instance, tokensReducer} from './reducers'

const reducer = combineReducers(
    Object.assign({},
        {
            tokens: tokensReducer,
            queryAddress,   // ES6 shorthand for "queryAddress: queryAddress"
            web3Instance,
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