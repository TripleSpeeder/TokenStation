import {createStore, combineReducers, applyMiddleware} from 'redux'
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

/*
- Restore all BigNumber instances that have been converted to string while being hydrated
 */
const tokensByIdTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        return inboundState
    },
    // transform state being rehydrated
    (outboundState, key) => {
        // for each entry in token.byIds, restore BigNumbers
        const newState = {...outboundState}
        Object.keys(newState).forEach(tokenId => {
            const tokenEntry = newState[tokenId]
            newState[tokenId] = {
                ...tokenEntry,
                decimals: window.web3.toBigNumber(tokenEntry.decimals),
                supply: {
                    ...tokenEntry.supply,
                    supply: tokenEntry.supply.supply ? window.web3.toBigNumber(tokenEntry.supply.supply) : undefined
                }
            }
        })

        return newState;
    },
    // define which reducers this transform gets called for.
    { whitelist: ['byId'] }
);

/*
- Mark all balances that have been hydrated while being in state "loading" as "hydrated_while_loading", so i can restart loading them.
- Restore all BigNumber instances that have been converted to string while being hydrated
 */
const balanceTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        return inboundState
    },
    // transform state being rehydrated
    (outboundState, key) => {
        // for each entry in balance.byId, restore BigNumbers
        const newState = {...outboundState}
        Object.keys(newState.byId).forEach(balanceId => {
            const balanceEntry = newState.byId[balanceId]
            const newBalanceState = balanceEntry.balanceState === BALANCE_STATES.LOADING ? BALANCE_STATES.HYDRATED_WHILE_LOADING : balanceEntry.balanceState
            newState.byId[balanceId] = {
                ...balanceEntry,
                balance: window.web3.toBigNumber(balanceEntry.balance),
                balanceState: newBalanceState
            }
        })
        return newState;
    },
    // define which reducers this transform gets called for.
    { whitelist: ['balance'] }
);

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


const tokensConfig = {
    key: 'tokens',
    storage: storage,
    transforms: [
        tokensByIdTransform
    ],
    blacklist: ['volatileById']
}

const reducer = combineReducers({
    web3Instance,
    tokens: persistReducer(tokensConfig, tokens),
    addresses,
    balance,
    events,
})

const rootConfig = {
    key: 'root',
    storage: storage,
    transforms: [
        balanceTransform,
        addressesTransform
    ],
    blacklist: ['web3Instance', 'tokens'],
}
const persistedReducer = persistReducer(rootConfig, reducer)

export default () => {
    let store = createStore(
        persistedReducer,
        applyMiddleware(
            thunk,
            logger,
        )
    )
    let persistor = persistStore(store )
    return {store, persistor}
}

export const history = createHistory()

