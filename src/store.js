import {createStore, combineReducers, applyMiddleware} from 'redux'
import {tokens} from "./modules/token/reducers/tokenReducer"
import {web3Instance} from "./modules/web3/web3Reducer"
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {addresses} from './modules/address/reducers/addressReducer'
import {balance} from './modules/balance/reducer/balanceReducer'
// Logger with default options
import logger from 'redux-logger'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

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
            newState.byId[balanceId] = {
                ...balanceEntry,
                balance: window.web3.toBigNumber(balanceEntry.balance),
            }
        })

        return newState;
    },
    // define which reducers this transform gets called for.
    { whitelist: ['balance'] }
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
})

const rootConfig = {
    key: 'root',
    storage: storage,
    transforms: [
        balanceTransform
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

