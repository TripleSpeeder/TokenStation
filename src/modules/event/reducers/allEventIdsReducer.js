import {ADD_EVENTS} from '../eventActions'
import {CLEAR_TOKEN_LIST} from '../../token/tokenActions'

const ALL_EVENTS_INITIAL = []

function addEventIds(state, action) {
    const {payload} = action
    const {events} = payload
    let newState = state
    events.forEach(transferEvent => {
        const transferEventId = transferEvent.id
        // prevent duplicate entries
        const existingIndex = state.indexOf(transferEventId)
        if (existingIndex > -1) {
            console.warn("Ignoring duplicate event " + transferEventId)
            return
        }
        newState = newState.concat(transferEventId)
    })
    return newState
}

function clearEvents() {
    return ALL_EVENTS_INITIAL
}

export const allEventIdsReducer = (state=ALL_EVENTS_INITIAL, action) => {
    switch (action.type) {
        case ADD_EVENTS:
            return addEventIds(state, action)
        case CLEAR_TOKEN_LIST:
            return clearEvents()
        default:
    }
    return state;
}
