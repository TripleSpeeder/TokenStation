import {ADD_EVENT} from '../eventActions'

const EVENT_BY_ID_INITIAL = {}

function addEventEntry(state, action) {
    const {payload} = action
    const {eventId, event} = payload
    if (Object.keys(state).indexOf(eventId) > -1)
    {
        console.warn("Ignoring duplicate event " + eventId)
        return state
    }
    return {
        ...state,
        [eventId]: {
            event,
        },
    }
}

export const eventByIdReducer = (state=EVENT_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_EVENT:
            return addEventEntry(state, action)
        default:
    }
    return state;
}
