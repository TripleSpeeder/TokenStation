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
    // TODO - Use event.logIndex instead of event.transactionIndex
    return '' + event.transactionHash + '-' + event.transactionIndex
}


/*

var fil = prochain.Transfer({_to: '0x9041fe5b3fdea0f5e4afdc17e75180738d877a01'}, {fromBlock: 4101630, toBlock: 'latest'})
fil.get(function(error, response) {if (error) {console.log("Error: " + error)} else {console.log("success: " + response); results = response}})

 */