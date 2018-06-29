import {
    CHANGE_BALANCE_FILTER_PROPS,
} from '../balanceActions'
import {CLEAR_TOKEN_LIST} from '../../token/tokenActions'

const BALANCE_LISTSTATE_INITIAL = {
    filter: '',
    matchedBalanceIds: [],
    displayCount: 10,
}

function clearBalanceListState() {
    return BALANCE_LISTSTATE_INITIAL
}

function changeBalanceFilterProps(state, action){
    const {payload} = action
    const {filter, matchedBalanceIds} = payload
    return {
        ...state,
        filter,
        matchedBalanceIds
    }
}

function resetBalanceDisplayCount(state) {
    return {
        ...state,
        displayCount: BALANCE_LISTSTATE_INITIAL.displayCount
    }
}


export const listStateReducer = (state=BALANCE_LISTSTATE_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_BALANCE_FILTER_PROPS:
            return changeBalanceFilterProps(state, action)
        case CLEAR_TOKEN_LIST:
            return clearBalanceListState()
        default:
            return state
    }
}

