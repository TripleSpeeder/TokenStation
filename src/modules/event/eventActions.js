export const ADD_EVENT = 'ADD_EVENT'
export function addEvent(event, type) {
    return {
        type: ADD_EVENT,
        payload: {
            eventId: buildEventId(event),
            event,
        }
    }
}

export function buildEventId(event) {
    return '' + event.blockHash + event.transactionHash
}


/*

var fil = prochain.Transfer({_to: '0x9041fe5b3fdea0f5e4afdc17e75180738d877a01'}, {fromBlock: 4101630, toBlock: 'latest'})
fil.get(function(error, response) {if (error) {console.log("Error: " + error)} else {console.log("success: " + response); results = response}})

 */