import {ADD_EVENTS, buildEventId} from '../eventActions'
import {CLEAR_TOKEN_LIST} from '../../token/tokenActions'

const EVENT_BY_ID_INITIAL = {}

function addEvents(state, action) {
    const {payload} = action
    const {events, tokenId} = payload
    events.forEach(transferEvent => {
        const transferEventId = buildEventId(transferEvent)
        // prevent duplicate entries
        if (Object.keys(state).includes(transferEventId ))
        {
            console.warn("Ignoring duplicate event " + transferEventId )
            return
        }
        state = {
            ...state,
            [transferEventId]: {
                transferEventId,
                tokenId,
                transferEvent,
            },
        }
    })
    return state
}

function clearEvents() {
    return EVENT_BY_ID_INITIAL
}

export const eventByIdReducer = (state=EVENT_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_EVENTS:
            return addEvents(state, action)
        case CLEAR_TOKEN_LIST:
            return clearEvents()
        default:
    }
    return state;
}
