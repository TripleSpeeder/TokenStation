import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'


export const ADD_EVENTS = 'ADD_EVENTS'
export function addEvents(events, tokenId, fromBlock, toBlock) {
    return {
        type: ADD_EVENTS,
        payload: {
            events,
            tokenId,
            fromBlock,
            toBlock
        }
    }
}

export const CREATE_ACE_ENTRY = 'CREATE_ACE_ENTRY'
export function createAceEntry(addressId, tokenId) {
    return {
        type: CREATE_ACE_ENTRY,
        payload: {
            addressId,
            tokenId
        }
    }
}

export function addEventsThunk(events, tokenId, fromBlock, toBlock) {
    return async (dispatch, getState) => {
        // Make sure that there are AddressContractEvent entries
        // for all events and to/from addresses
        events.forEach(transferEvent => {
            const {_from, _to} = transferEvent.args
            const aceFromId = buildAdressContractEventId(_from, tokenId)
            const aceToId = buildAdressContractEventId(_to, tokenId)

            // TODO: Only create new entries for addresses that are being tracked
            // TODO: Collect all new entries and just dispatch one batch event
            if (getState().events.aceById[aceFromId] === undefined) {
                // create a new entry for this token and address
                dispatch(createAceEntry(_from, tokenId))
            }
            if (getState().events.aceById[aceToId] === undefined) {
                // create a new entry for this token and address
                dispatch(createAceEntry(_to, tokenId))
            }
        })
        // now it's safe to do the actual dispatch of addEvents
        dispatch(addEvents(events, tokenId, fromBlock, toBlock))
    }
}

export function buildEventId(event) {
    return '' + event.transactionHash + '-' + event.logIndex
}
