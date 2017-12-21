import {createStore, combineReducers, applyMiddleware} from 'redux'
import {ERC20Contracts, queryAddress, web3Instance} from './reducers'

const reducer = combineReducers(
    Object.assign({},
        {
            ERC20Contracts,  // ES6 shorthand for {'ERC20Contracts': ERC20Contracts}
            queryAddress,
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