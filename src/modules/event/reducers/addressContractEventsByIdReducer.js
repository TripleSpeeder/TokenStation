import {
    ACE_ENTRY_BLOCK_RANGE_CHANGE, ACE_ENTRY_LOADING_CHANGE, ADD_EVENTS, buildEventId,
    CREATE_ACE_ENTRY
} from '../eventActions'

/*
Purpose: Store list of transfer events involving certain address
and certain token contract.
Keeps track of the block range already queried from web3 (firstBlock, lastBlock),
so i can easily extend checked block range or refresh if outdated.
 */
const ADDRESS_CONTRACT_EVENTS_BY_ID_INITIAL = {}
/*
const ADDRESS_CONTRACT_EVENTS_BY_ID_INITIAL = {
    0xabc123-12: {
        acesId: '0xabc123-12',    // <addressId>-<tokenId>
        addressId: '0xabc123',
        tokenId: 12
        loading: false,
        firstBlock: 0,
        lastBlock: 0,
        eventIds: [],
    },
}
*/

function createAceEntry(state, action) {
    const {payload} = action
    const {addressId, tokenId} = payload
    const acesId = buildAdressContractEventId(addressId, tokenId)
    return {
        ...state,
        [acesId] : {
            acesId,
            addressId,
            tokenId,
            isLoading: false,
            firstBlock: 0,
            lastBlock: 0,
            eventIds: [],
        }
    }
}

function addTransferEvents(state, action) {
    // Attach the new events to the address, if it is "to" or "from"
    const {payload} = action
    const {events, tokenId} = payload

    const newState = state

    events.forEach(transferEvent => {
        const transferEventId = buildEventId(transferEvent)
        const {_from, _to} = transferEvent.args
        const aceFromId = buildAdressContractEventId(_from, tokenId)
        const aceToId = buildAdressContractEventId(_to, tokenId)
        const aceIds = [aceToId, aceFromId]
        aceIds.forEach(aceId => {
            // prevent duplicate eventID entries
            if (newState[aceId].eventIds.includes(transferEventId ))
            {
                console.warn("Ignoring duplicate event " + transferEventId )
                return
            }
            newState[aceId].eventIds = newState[aceId].eventIds.concat(transferEventId)
        })
    })
    return newState
}

function aceEntryLoadingChange(state, action) {
    const {payload} = action
    const {aceId, isLoading} = payload
    const aceEntry = state[aceId]
    if (aceEntry) {
        return {
            ...state,
            [aceId] : {
                ...aceEntry,
                isLoading,
            }
        }
    } else {
        // entry not found, ignore...
        return state
    }
}

function aceEntryBlockRangeChange(state, action) {
    const {payload} = action
    const {aceId, fromBlock, toBlock} = payload
    const aceEntry = state[aceId]
    if (aceEntry) {
        // update checked block range
        if (aceEntry.firstBlock === 0) {
            aceEntry.firstBlock = fromBlock
        } else {
            aceEntry.firstBlock = Math.min(fromBlock, aceEntry.firstBlock)
        }
        if (aceEntry.lastBlock === 0) {
            aceEntry.lastBlock = toBlock
        } else {
            aceEntry.lastBlock = Math.max(toBlock, aceEntry.lastBlock)
        }

        return {
            ...state,
            [aceId] : aceEntry
        }
    } else {
        // entry not found, ignore...
        return state
    }
}

export const addressContractEventsByIdReducer = (state=ADDRESS_CONTRACT_EVENTS_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case CREATE_ACE_ENTRY:
            return createAceEntry(state, action)
        case ADD_EVENTS:
            return addTransferEvents(state, action)
        case ACE_ENTRY_LOADING_CHANGE:
            return aceEntryLoadingChange(state, action)
        case ACE_ENTRY_BLOCK_RANGE_CHANGE:
            return aceEntryBlockRangeChange(state, action)
        default:
    }
    return state;
}


export function buildAdressContractEventId(addressId, tokenId) {
    return ''+addressId.toLowerCase()+'-'+tokenId
}