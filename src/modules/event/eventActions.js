export const ADD_EVENT = 'ADD_EVENT'
export function addEvent(event, tokenId) {
    return {
        type: ADD_EVENT,
        payload: {
            eventId: buildEventId(event),
            tokenId,
            // from: TODO,
            // to: TODO,
            event,
        }
    }
}

// Required as i need to obtain the tokenID and only have the token Address.
// Might need to refactor token module to use token address also as ID to get rid of this...
export function addEventWrapper(event) {
    return (dispatch, getState) => {
        const token = Object.values(getState().tokens.byId).find(token => (token.address === event.address))
        dispatch(addEvent(event, token.id))
    }
}

export function buildEventId(event) {
    return '' + event.transactionHash + '-' + event.logIndex
}
