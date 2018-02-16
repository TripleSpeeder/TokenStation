import {ADD_EVENT} from '../eventActions'

const ALL_EVENTS_INITIAL = []

function addEventId(state, action) {
    const {payload} = action
    const {eventId} = payload
    // prevent duplicate entries
    const existingIndex = state.indexOf(eventId)
    if (existingIndex > -1) {
        console.warn("Ignoring duplicate event " + eventId)
        return state
    }
    return state.concat(eventId)
}

export const allEventIdsReducer = (state=ALL_EVENTS_INITIAL, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return addEventId(state, action)
        default:
    }
    return state;
}
