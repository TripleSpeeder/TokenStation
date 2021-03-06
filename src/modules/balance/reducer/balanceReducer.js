import {combineReducers} from "redux"
import {byId} from './balanceByIdReducer'
import {allIds} from './allBalancesReducer'
import {positiveIds} from './positiveBalancesReducer'
import {listStateReducer} from './BalanceListStateReducer'

/*
State tree:
{
    balance: {
        byId: {
            [1]: {
                balanceId: 1
                tokenId: 1
                addressId: 1
                balance: 22.45
            },
        }
        allIds: [1],
        positiveIds: [1]    // all balances that have an actual balance > 0
        listState: {
            filter: '',
            matchedBalanceIds: [],
            displayCount: 10,
        }
    }
}
*/

export const balance = combineReducers({
    byId : byId,
    allIds : allIds,
    positiveIds: positiveIds,
    listState: listStateReducer,
})
