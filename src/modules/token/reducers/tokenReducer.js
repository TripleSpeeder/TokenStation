import {combineReducers} from "redux"
import {listStateReducer} from './ListStateReducer'
import {tokensByIdReducer} from './TokensByIdReducer'
import {allTokensReducer} from './AllIdsReducer'
import {volatileTokensByIdReducer} from './volatileTokensByIdReducer'
import {trackedTokensReducer} from './TrackedIdsReducer'
import {selectorReducer} from './SelectorReducer'

/*
State tree:
{
    listState: {
        listState: 'loading'
        filter: 'Dumb'
        matchedTokenIds: [6]
        total: 2
        activePage: 1
    }
    byId: {
        [1]: {
            loading: true
            tokenID: 1
            name: 'GAVCoin'
            address: '0x123456678'
            contractInstance: null
            supply: {
                loading: true
                supply: 0
            }
            balance: {
                loading: false
                supply: 0
            }
            ...
        },
        [6]: {
            loading: false
            tokenID: 6
            name: 'DumbCoin'
            address: '0x123456678'
            contractInstance: <truffle-contract instance>
            supply: {
                loading: false
                supply: 200000
            }
            balance: {
                loading: false
                supply: 0
            }
            ...
        }
    },
    allIds: [1, 6],
    trackedIds: [3, 4]
}
*/

export const tokens = combineReducers({
    listState: listStateReducer,
    byId : tokensByIdReducer,
    allIds : allTokensReducer,
    trackedIds: trackedTokensReducer,
    volatileById: volatileTokensByIdReducer,
    selector: selectorReducer,
});
