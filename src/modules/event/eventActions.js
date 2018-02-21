export const ADD_EVENTS = 'ADD_EVENTS'
export function addEvents(events, tokenId) {
    return {
        type: ADD_EVENTS,
        payload: {
            tokenId,
            events,
        }
    }
}

export function buildEventId(event) {
    return '' + event.transactionHash + '-' + event.logIndex
}
