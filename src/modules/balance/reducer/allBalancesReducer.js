import {CREATE_BALANCE_ENTRY, DELETE_BALANCE_ENTRY} from '../balanceActions'

const ALL_BALANCES_INITIAL = []

function createBalanceEntry(state, action) {
    const {payload} = action
    const {balanceId} = payload
    // prevent duplicate entries
    const existingIndex = state.indexOf(balanceId)
    if (existingIndex > -1) {
        console.warn("Ignoring duplicate balance " + balanceId)
        return state
    }
    return state.concat(balanceId)
}

function deleteBalanceEntry(state, action) {
    const {payload} = action
    const {balanceId} = payload
    const index = state.indexOf(balanceId)
    if (index > -1){
        state.splice(index, 1)
        return state
    }
    return state
}


export const allIds = (state=ALL_BALANCES_INITIAL, action) => {
    switch (action.type) {
        case CREATE_BALANCE_ENTRY: {
            return createBalanceEntry(state, action)
        }
        case DELETE_BALANCE_ENTRY: {
            return deleteBalanceEntry(state, action)
        }
        default:
            return state
    }
}
