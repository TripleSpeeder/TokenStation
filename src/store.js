import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'
import logger from 'redux-logger'
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
    (inboundState, key) => {
        return inboundState
    },
    // transform state being rehydrated
    (outboundState, key) => {
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

const reducer = combineReducers({
    web3Instance,
    tokens,
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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

export const history = createHistory()

