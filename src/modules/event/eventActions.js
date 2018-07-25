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

export const CHANGE_TRANSFEREVENTLIST_PAGE = 'CHANGE_TRANSFEREVENTLIST_PAGE'
export function changeTransferEventListPage(activePage) {
    return {
        type: CHANGE_TRANSFEREVENTLIST_PAGE,
        payload: {
            activePage
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
export function aceEntriesLoadingChange(addressIds, tokenId, isLoading, loadingFromBlock, loadingToBlock, loadingCurrentBlock) {
    const aceIds = addressIds.map(addressId => (buildAdressContractEventId(addressId, tokenId)))
    return {
        type: ACE_ENTRIES_LOADING_CHANGE,
        payload: {
            aceIds,
            isLoading,
            loadingFromBlock,
            loadingToBlock,
            loadingCurrentBlock,
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

export const SET_ACE_ENTRY_EVENT_IDS = 'SET_ACE_ENTRY_EVENT_IDS'
export function setAceEntryEventIds(aceId, eventIds) {
    return {
        type: SET_ACE_ENTRY_EVENT_IDS,
        payload: {
            aceId,
            eventIds
        }
    }
}

export function aceEntriesLoadingChangeWrapper(addressIds, tokenId, isLoading, loadingFromBlock, loadingToBlock, loadingCurrentBlock) {
    return async (dispatch, getState) => {
        addressIds.forEach(addressId => {
            const aceId = buildAdressContractEventId(addressId, tokenId)
            if (getState().events.aceById[aceId] === undefined) {
                // create a new entry for this token and address
                dispatch(createAceEntry(addressId, tokenId))
            }
        })
        dispatch(aceEntriesLoadingChange(addressIds, tokenId, isLoading, loadingFromBlock, loadingToBlock, loadingCurrentBlock))
    }
}

export function addEventsThunk(events, tokenId, fromBlock, toBlock) {
    return (dispatch, getState) => {
        // Make sure that there are AddressContractEvent entries
        // for all events and to/from addresses
        let aceIdsToSort = []
        const watchedAddressIds = getState().addresses.allIds
        events.forEach(transferEvent => {
            const {_from, _to} = transferEvent.args
            // TODO: Collect all new entries and just dispatch one batch event
            if (watchedAddressIds.includes(_from.toLowerCase())) {
                const aceFromId = buildAdressContractEventId(_from, tokenId)
                aceIdsToSort.push(aceFromId)
                if (getState().events.aceById[aceFromId] === undefined) {
                    // create a new entry for this token and address
                    dispatch(createAceEntry(_from, tokenId))
                }
            }
            if (watchedAddressIds.includes(_to.toLowerCase())) {
                const aceToId = buildAdressContractEventId(_to, tokenId)
                aceIdsToSort.push(aceToId)
                if (getState().events.aceById[aceToId] === undefined) {
                    // create a new entry for this token and address
                    dispatch(createAceEntry(_to, tokenId))
                }
            }
        })
        // now it's safe to do the actual dispatch of addEvents
        dispatch(addEvents(events, tokenId, fromBlock, toBlock))
        // finally re-sort eventIds of all changed aceIds
        dispatch(sortEventsThunk(aceIdsToSort))
    }
}

export function sortEventsThunk(aceIds) {
    return (dispatch, getState) => {
        const eventsById = getState().events.byId
        // sort eventIds of provided ace entries based on the blockheight they appeared at
        aceIds.forEach(aceId => {
            // sort eventIds based on blockheight
            // use .slice() to work on a copy of the eventIds array, otherwise i would mutate current state...
            let eventIds = getState().events.aceById[aceId].eventIds.slice().sort((eventA, eventB) => {
                return eventsById[eventB].transferEvent.blockNumber - eventsById[eventA].transferEvent.blockNumber
            })
            // set new eventIds array via dedicated action
            dispatch(setAceEntryEventIds(aceId, eventIds))
        })
    }
}

export function buildEventId(event) {
    return '' + event.transactionHash + '-' + event.logIndex
}
