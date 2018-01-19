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

const reducer = combineReducers(
    Object.assign({},
        {
            web3Instance,
            tokens,
            addresses,
            balance,
        }
    )
)

const myTransform = createTransform(
    // transform state on its way to being serialized and persisted.
    (inboundState, key) => {
        // for each entry in token.byIds, nullify contractInstance and loadingPromise
        const newState = {...inboundState}
        Object.keys(newState.byId).forEach(tokenId => {
            const tokenEntry = newState.byId[tokenId]
            newState.byId[tokenEntry.id] = {
                ...tokenEntry,
                loadingPromise: null,
                contractInstance: null,
            }
        })

        return newState;
    },
    // transform state being rehydrated
    (outboundState, key) => {
        // for each entry in token.byIds, restore BigNumbers
        // convert mySet back to a Set.
        const newState = {...outboundState}
        Object.keys(newState.byId).forEach(tokenId => {
            const tokenEntry = newState.byId[tokenId]
            newState.byId[tokenId] = {
                ...tokenEntry,
                decimals: window.web3.toBigNumber(tokenEntry.decimals),
                loadingPromise: null,
                contractInstance: null,
                supply: {
                    ...tokenEntry.supply,
                    supply: window.web3.toBigNumber(tokenEntry.supply.supply)
                }
            }
        })

        return newState;
        // return { ...outboundState, mySet: new Set(outboundState.mySet) };
    },
    // define which reducers this transform gets called for.
    { whitelist: ['tokens'] }
);

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['web3Instance'],
    transforms: [
        myTransform
    ]
}
const persistedReducer = persistReducer(persistConfig, reducer)
/*
const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunk,
        logger,
    )
);
*/




export const history = createHistory()

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
