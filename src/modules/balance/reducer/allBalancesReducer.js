import {CREATE_BALANCE_ENTRY} from '../balanceActions'

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

export const allIds = (state=ALL_BALANCES_INITIAL, action) => {
    switch (action.type) {
        case CREATE_BALANCE_ENTRY: {
            return createBalanceEntry(state, action)
        }
        default:
            return state
    }
}
