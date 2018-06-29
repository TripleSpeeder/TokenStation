import {CHANGE_TOKEN_LIST_STATE, CHANGE_TOKEN_TRACKING, TOKEN_LIST_STATES} from '../tokenActions'

const TRACKED_TOKENS_INITIAL = []

function changeTokenTracking(state, action) {
    const {payload} = action
    const {tokenId, doTrack} = payload
    // Check if this token is currently tracked
    const trackedIndex = state.indexOf(tokenId)
    if (doTrack && (trackedIndex === -1)) {
        // Add new tracked entry
        return state.concat(tokenId)
    }
    if (!doTrack && (trackedIndex > -1)) {
        // remove existing tracked entry
        state.splice(trackedIndex, 1)
        return state
    }
    // No need to change anything
    return state
}

export const trackedTokensReducer = (state=TRACKED_TOKENS_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_TOKEN_TRACKING:
            return changeTokenTracking(state, action)
        default:
            return state
    }
}

