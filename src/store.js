import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'
import {createLogger} from 'redux-logger'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {BALANCE_STATES} from './modules/balance/balanceActions'
import {events} from './modules/event/reducers/eventReducer'
import {modal} from './modules/modal/modalReducer'


/*
Mark all address entries that have been hydrated while being in state "loading" as "hydrated_while_loading", so i can restart loading them.
 */
const addressesTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState) => {
        return inboundState
    },
    // transform state being rehydrated
    (outboundState) => {
        const newState = {...outboundState}
        Object.keys(newState.byId).forEach(addressId => {
            const addressEntry = newState.byId[addressId]
            const newAddressState = addressEntry.balancesState === BALANCE_STATES.LOADING ? BALANCE_STATES.HYDRATED_WHILE_LOADING : addressEntry.balancesState
            newState.byId[addressId] = {
                ...addressEntry,
                balancesState: newAddressState
            }
        })
        return newState;
    },
    // define which reducers this transform gets called for.
    { whitelist: ['addresses'] }
);

const tokensConfig = {
    key: 'tokens',
    storage: storage,
    transforms: [],
    // Only persist tracked tokens and last selected token
    whitelist: ['trackedIds', 'selector']
}

const reducer = combineReducers({
    web3Instance,
    tokens: persistReducer(tokensConfig, tokens),
    addresses,
    balance,
    events,
    modal,
})

const rootConfig = {
    key: 'root',
    storage: storage,
    transforms: [
        addressesTransform
    ],
    // Don't persist these subtrees:
    blacklist: ['web3Instance', 'tokens', 'balance', 'events', 'modal'],
}
const persistedReducer = persistReducer(rootConfig, reducer)

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
        persistedReducer,
        compose(
            applyMiddleware(
                thunk,
                logger,
            )
        )
    )
    let persistor = persistStore(store )
    return {store, persistor}
}

