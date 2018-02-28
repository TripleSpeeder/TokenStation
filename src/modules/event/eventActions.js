import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'


export const ADD_EVENTS = 'ADD_EVENTS'
export function addEvents(events, tokenId, fromBlock, toBlock) {
    return {
        type: ADD_EVENTS,
        payload: {
            events,
            tokenId,
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

export const ACE_ENTRIES_LOADING_CHANGE = 'ACE_ENTRIES_LOADING_CHANGE'
export function aceEntriesLoadingChange(addressIds, tokenId, isLoading) {
    const aceIds = addressIds.map(addressId => (buildAdressContractEventId(addressId, tokenId)))
    return {
        type: ACE_ENTRIES_LOADING_CHANGE,
        payload: {
            aceIds,
            isLoading,
        }
    }
}

export const ACE_ENTRIES_BLOCK_RANGE_CHANGE = 'ACE_ENTRIES_BLOCK_RANGE_CHANGE'
export function aceEntriesBlockRangeChange(addressIds, tokenId, fromBlock, toBlock) {
    const aceIds = addressIds.map(addressId => (buildAdressContractEventId(addressId, tokenId)))
    return {
        type: ACE_ENTRIES_BLOCK_RANGE_CHANGE,
        payload: {
            aceIds,
            fromBlock,
            toBlock,
        }
    }
}

export function aceEntriesLoadingChangeWrapper(addressIds, tokenId, isLoading) {
    return async (dispatch, getState) => {
        addressIds.forEach(addressId => {
            const aceId = buildAdressContractEventId(addressId, tokenId)
            if (getState().events.aceById[aceId] === undefined) {
                // create a new entry for this token and address
                dispatch(createAceEntry(addressId, tokenId))
            }
        })
        dispatch(aceEntriesLoadingChange(addressIds, tokenId, isLoading))
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
