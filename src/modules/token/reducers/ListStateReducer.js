import {
    CHANGE_FILTER_PROPS, CHANGE_TOKEN_LIST_STATE, CHANGE_VALID_TOKEN_COUNT, RESET_DISPLAY_COUNT, SHOW_MORE_ITEMS,
    TOKEN_LIST_STATES
} from '../tokenActions'

const LISTSTATE_INITIAL = {
    listState: TOKEN_LIST_STATES.VIRGIN,
    total: 0,
    filter: '',
    matchedTokenIds: [],
    displayCount: 10,
}

function resetDisplayCount(state) {
    return {
        ...state,
        displayCount: LISTSTATE_INITIAL.displayCount
    }
}

function tokenListStateChanged(state, action) {
    // very simple reducer, just set a new state
    const {payload} = action
    const {listState} = payload
    return {
        ...state,
        listState
    }
}

function changeValidTokenCount(state, action){
    const {payload} = action
    const {count} = payload
    return {
        ...state,
        total: count
    }
}

function changeFilterProps(state, action){
    const {payload} = action
    const {filter, matchedTokenIds} = payload
    return {
        ...state,
        filter,
        matchedTokenIds
    }
}

function showMoreItems(state) {
    const stepSize = 3
    const filterIsActive = (state.filter.length > 0)
    if (filterIsActive)
    {
        // check filtered numbers
        if (state.displayCount >= state.matchedTokenIds.length) {
            // already displaying all tokens.
            return state
        }
    } else {
        // check total numbers
        if (state.displayCount >= state.total) {
            // already displaying all tokens.
            return state
        }
    }
    let requestedCount = state.displayCount+=stepSize

    // don't try to display more tokens than available
    if (requestedCount > state.total) {
        requestedCount = state.total
    }

    return {
        ...state,
        displayCount: requestedCount
    }
}

export const listStateReducer = (state=LISTSTATE_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_TOKEN_LIST_STATE:
            return tokenListStateChanged(state, action)
        case CHANGE_VALID_TOKEN_COUNT:
            return changeValidTokenCount(state, action)
        case CHANGE_FILTER_PROPS:
            return changeFilterProps(state, action)
        case SHOW_MORE_ITEMS:
            return showMoreItems(state)
        case RESET_DISPLAY_COUNT:
            return resetDisplayCount()
        default:
            return state
    }
}

