import {combineReducers} from "redux"
import {balanceById} from './balanceByIdReducer'
import {allBalances} from './allBalancesReducer'

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
        allIds: [1]
    }
}
*/

export const balance = combineReducers({
    byId : balanceById,
    allBalances : allBalances
})