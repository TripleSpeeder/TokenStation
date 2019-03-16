import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'
import {createLogger} from 'redux-logger'
import {events} from './modules/event/reducers/eventReducer'
import {modal} from './modules/modal/modalReducer'


const reducer = combineReducers({
    web3Instance,
    tokens,
    addresses,
    balance,
    events,
    modal,
})

const logger = createLogger({
    // Would love to log state diffs, but apparently logger tries to call all web3 instance methods
    // which will make metamask throw an error due to trying to call methods synchronous.
    // There may be a workaround somewhere, but disabling state diff for now...
    diff: false
});

// REDUX Dev Tools don't play well at all with web3 from Metamask extension...
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    let store = createStore(
        reducer,
        compose(
            applyMiddleware(
                thunk,
                logger,
            )
        )
    )
    return {store}
}

