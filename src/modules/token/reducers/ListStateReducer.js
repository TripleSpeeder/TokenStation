import {
    CHANGE_FILTER_PROPS,
    CHANGE_TOKEN_LIST_PAGE,
    CHANGE_TOKEN_LIST_STATE,
    CHANGE_VALID_TOKEN_COUNT, CLEAR_TOKEN_LIST,
    RESET_DISPLAY_COUNT,
    TOKEN_LIST_STATES
} from '../tokenActions'

const LISTSTATE_INITIAL = {
    listState: TOKEN_LIST_STATES.VIRGIN,
    total: 0,
    filter: '',
    matchedTokenIds: [],
    displayCount: 10,
    showOnlyTracked: false,
    filterIsActive: false,
    activePage: 1,
}

function clearTokenList(state) {
    return {
        ...state,
        displayCount: LISTSTATE_INITIAL.displayCount,
        matchedTokenIds: LISTSTATE_INITIAL.matchedTokenIds,
        activePage: LISTSTATE_INITIAL.activePage,
        total: LISTSTATE_INITIAL.total,
        listState: LISTSTATE_INITIAL.listState,
    }
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
    const {filter, matchedTokenIds, showOnlyTracked, filterIsActive} = payload
    return {
        ...state,
        filter,
        matchedTokenIds,
        showOnlyTracked,
        filterIsActive,
    }
}

function tokenListPageChanged(state, action)  {
    const {payload} = action
    const {activePage} = payload
    return {
        ...state,
        activePage,
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
        case RESET_DISPLAY_COUNT:
            return resetDisplayCount(state)
        case CHANGE_TOKEN_LIST_PAGE:
            return tokenListPageChanged(state, action)
        case CLEAR_TOKEN_LIST:
            return clearTokenList(state)
        default:
            return state
    }
}

