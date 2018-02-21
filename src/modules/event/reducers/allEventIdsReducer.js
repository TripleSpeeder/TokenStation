import {ADD_EVENTS, buildEventId} from '../eventActions'

const ALL_EVENTS_INITIAL = []

function addEventIds(state, action) {
    const {payload} = action
    const {events} = payload
    let newState = state
    events.forEach(transferEvent => {
        const transferEventId = buildEventId(transferEvent)
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

export const allEventIdsReducer = (state=ALL_EVENTS_INITIAL, action) => {
    switch (action.type) {
        case ADD_EVENTS:
            return addEventIds(state, action)
        default:
    }
    return state;
}
