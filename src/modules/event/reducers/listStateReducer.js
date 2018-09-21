import {CHANGE_EVENT_SCAN_PROPS, CHANGE_TRANSFEREVENTLIST_PAGE} from '../eventActions'
import {CHANGE_SELECTOR_ADDRESSID} from '../../address/addressActions'
import {CHANGE_SELECTOR_TOKENID, CLEAR_TOKEN_LIST} from '../../token/tokenActions'

const LISTSTATE_INITIAL = {
    activePage: 1,
    currentChunk: 0,
    maxChunks: 0,
}

function transferEventListPageChanged(state, action)  {
    const {payload} = action
    const {activePage} = payload
    return {
        ...state,
        activePage,
    }
}

function resetPager(state) {
    return {
        ...state,
        activePage: 1
    }
}

function changeEventScanProps(state, action) {
    const {payload} = action
    const {
        tokenID,
        addresses,
        numEvents,
        currentChunk,
        maxEvents,
        maxChunks,
        fromBlock,
        toBlock,
    } = payload.props

    return {
        ...state,
        currentChunk,
        maxChunks
    }
}

export const transferEventListStateReducer = (state=LISTSTATE_INITIAL, action) => {
    switch(action.type) {
        case CHANGE_TRANSFEREVENTLIST_PAGE:
            return transferEventListPageChanged(state, action)
        case CHANGE_EVENT_SCAN_PROPS:
            return changeEventScanProps(state, action)
        case CHANGE_SELECTOR_ADDRESSID:
        case CHANGE_SELECTOR_TOKENID:
        case CLEAR_TOKEN_LIST:
            return resetPager(state, action)
        default:
            return state
    }
}
