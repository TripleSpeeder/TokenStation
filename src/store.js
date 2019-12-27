import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'
import {createLogger} from 'redux-logger'
import {events} from './modules/event/reducers/eventReducer'
import {modal} from './modules/modal/modalReducer'
import {composeWithDevTools} from 'redux-devtools-extension'


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

// Enable redux dev tools
const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    maxAge: 50,
    // Ignore:
    // - "ADD_TOKEN" as the number of events emitted during page load kill redux dev tools performance
    actionsBlacklist: ['ADD_TOKEN'],
    trace: false
});

export default () => {
    let store = createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(
                thunk,
                logger,
            )
        )
    )
    return {store}
}

