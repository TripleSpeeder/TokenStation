import contract from 'truffle-contract'
import erc20ABI from 'human-standard-token-abi'
import {
    BALANCE_STATES,
    balanceStateChanged,
    clearTokenBalances,
    setBalanceByAddressAndToken
} from '../balance/balanceActions'
import {
    aceEntriesBlockRangeChange, aceEntriesLoadingChange, aceEntriesLoadingChangeWrapper,
    addEventsThunk, changeEventScanProps
} from '../event/eventActions'

export const TOKEN_LIST_STATES = {
    VIRGIN: 'virgin',
    LOADING: 'loading',
    INITIALIZED: 'initialized'
}

export const CHANGE_TOKEN_LIST_STATE = 'IS_LOADING_TOKEN_LIST'
export function tokenListStateChanged(tokenListState) {
    return {
        type: CHANGE_TOKEN_LIST_STATE,
        payload: {
            listState: tokenListState
        }
    }
}

export const SHOW_MORE_ITEMS = 'SHOW_MORE_ITEMS'
export function showMoreItems() {
    return {
        type: SHOW_MORE_ITEMS
    }
}

export const ADD_TOKEN = 'ADD_TOKEN'
export function addToken(tokenID, token) {
    return {
        type: ADD_TOKEN,
        payload: {
            tokenID,
            token
        }
    }
}

export const ADD_VOLATILE_TOKEN = 'ADD_VOLATILE_TOKEN'
export function addVolatileToken(tokenID) {
    return {
        type: ADD_VOLATILE_TOKEN,
        payload: {
            tokenID,
        }
    }
}


export const IS_LOADING_TOKEN = 'IS_LOADING_TOKEN'
export function loadingTokenChanged(tokenID, isLoading) {
    return {
        type: IS_LOADING_TOKEN,
        payload: {
            tokenID,
            isLoading
        }
    }
}

export const SET_TOKEN_SUPPLY = 'SET_TOKEN_SUPPLY'
export function setTokenSupply(tokenID, supply) {
    return {
        type: SET_TOKEN_SUPPLY,
        payload: {
            tokenID,
            supply,
        }
    }
}

export const IS_LOADING_SUPPLY = 'IS_LOADING_SUPPLY'
export function loadingSupplyChanged(tokenID, isLoading) {
    return {
        type: IS_LOADING_SUPPLY,
        payload: {
            tokenID,
            isLoading
        }
    }
}

export const SET_TOKEN_CONTRACT_INSTANCE = 'SET_TOKEN_CONTRACT_INSTANCE'
export function setTokenContractInstance(tokenID, contractInstance) {
    return {
        type: SET_TOKEN_CONTRACT_INSTANCE,
        payload: {
            tokenID,
            contractInstance
        }
    }
}

export const SET_TOKEN_LOADING_PROMISE = 'SET_TOKEN_LOADING_PROMISE'
export function setTokenLoadingPromise(tokenID, loadingPromise) {
    return {
        type: SET_TOKEN_LOADING_PROMISE,
        payload: {
            tokenID,
            loadingPromise
        }
    }
}

export const CHANGE_SELECTOR_TOKENID = 'CHANGE_SELECTOR_TOKENID'
export function changeSelectorTokenId(selectedTokenId) {
    return {
        type: CHANGE_SELECTOR_TOKENID,
        payload: {
            selectedTokenId,
        }
    }
}

export const CLEAR_TOKEN_LIST = 'CLEAR_TOKEN_LIST'
export function clearTokenList() {
    return {
        type: CLEAR_TOKEN_LIST,
    }
}

export const CHANGE_VALID_TOKEN_COUNT = 'CHANGE_VALID_TOKEN_COUNT'
export function changeValidTokenCount(count) {
    return {
        type: CHANGE_VALID_TOKEN_COUNT,
        payload: {
            count
        }
    }
}

export const CHANGE_FILTER_PROPS = 'CHANGE_FILTER_PROPS'
export function changeFilterProps(filter, matchedTokenIds, showOnlyTracked, filterIsActive) {
    return {
        type: CHANGE_FILTER_PROPS,
        payload: {
            filter,
            matchedTokenIds,
            showOnlyTracked,
            filterIsActive,
        }
    }
}

export const RESET_DISPLAY_COUNT = 'RESET_DISPLAY_COUNT'
export function resetDisplayCount() {
    return {
        type: RESET_DISPLAY_COUNT,
    }
}

export const CHANGE_TOKEN_TRACKING = 'CHANGE_TOKEN_TRACKING'
export function changeTokenTracking(tokenId, doTrack) {
    return {
        type: CHANGE_TOKEN_TRACKING,
        payload: {
            tokenId,
            doTrack,
        }
    }
}

export const CHANGE_TOKEN_LIST_PAGE = 'CHANGE_TOKENLIST_PAGE'
export function changeTokenListPage(activePage) {
    return {
        type: CHANGE_TOKEN_LIST_PAGE,
        payload: {
            activePage
        }
    }
}

export function changeTokenTrackingThunk(tokenId, doTrack) {
    return (dispatch, getState) => {
        dispatch(changeTokenTracking(tokenId, doTrack))
        // if I start tracking a token, start getting balances right away
        if (doTrack) {
            getState().addresses.allIds.forEach(addressId => {
                    dispatch(loadTokenBalance(tokenId, addressId))
                }
            )
        } else {
            // If I stop tracking a token, also clear all balances for it
            dispatch(clearTokenBalances(tokenId))
        }
    }
}

export function setFilterProps(filterProps) {
    return (dispatch, getState) => {

        let {filterString, showOnlyTracked} = filterProps
        const oldFilterString = getState().tokens.listState.filter.toLowerCase()
        const oldShowOnlyTracked = getState().tokens.listState.showOnlyTracked
        if (filterString === undefined) {
            filterString = oldFilterString
        }
        if (showOnlyTracked === undefined) {
            showOnlyTracked = oldShowOnlyTracked
        }

        // Filter token list based on filterstring and show tracked only/all
        const searchString = filterString.toLowerCase()
        const filterIsActive = ((searchString.length > 0) || showOnlyTracked)
        const filterChanged = ((oldFilterString !== searchString) || (oldShowOnlyTracked !== showOnlyTracked))

        if (filterChanged) {
            // in case filter props changed, reset the number of displayed tokens to it's default value and set
            // default page
            dispatch(resetDisplayCount())
            dispatch(changeTokenListPage(1))
        }

        // start with all tokens
        let tokenIds = getState().tokens.allIds

        // filter by tracked status
        if (showOnlyTracked) {
            // get all tokens that are being tracked
            tokenIds = getState().tokens.trackedIds
        }

        // filter by search string
        if (searchString.length) {
            tokenIds = tokenIds.filter(tokenId => {
                const token = getState().tokens.byId[tokenId]
                return (
                    token.name.toLowerCase().includes(searchString) ||
                    token.symbol.toLowerCase().includes(searchString) ||
                    token.address.toLowerCase().includes(searchString)
                )
            })
        }

        dispatch(changeFilterProps(searchString, tokenIds, showOnlyTracked, filterIsActive))
    }
}

/* check if a new token matches current filter */
export function filterNewToken(tokenId) {
    return (dispatch, getState) => {
        const token = getState().tokens.byId[tokenId]
        const searchString = getState().tokens.listState.filter.toLowerCase()
        const match = (
            token.name.toLowerCase().includes(searchString) ||
            token.symbol.toLowerCase().includes(searchString) ||
            token.address.toLowerCase().includes(searchString)
        )
        if (match) {
            const newMatchedIds = getState().tokens.listState.matchedTokenIds.concat(tokenId)
            dispatch(changeFilterProps(searchString, newMatchedIds))
        }
    }
}

export function loadTokenList(url) {
    return async (dispatch, getState) => {
        // clear existing tokens
        dispatch(clearTokenList())
        dispatch(tokenListStateChanged(TOKEN_LIST_STATES.LOADING))
        // fetch json file from url
        const response = await fetch(url)
        // parse json
        const jsonTokens = await response.json()
        // sort token list alphabetically
        jsonTokens.sort((a, b) => ( (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : 1))

        // set total number of tokens (for loading progress)
        dispatch(changeValidTokenCount(jsonTokens.length))

        // Check if there is currently a filter set
        const filterIsActive = (getState().tokens.listState.filterIsActive)
        // add tokens
        jsonTokens.forEach((listToken) => {
            const token = mapListToken(listToken)
            dispatch(addToken(token.address, token))
        })
        // if there is already a filter set, re-evaluate the filter results
        if (filterIsActive) {
            dispatch(setFilterProps({}))
        }

        // Crosscheck tokens with currently tracked tokens
        const allTokenIds = getState().tokens.allIds
        const existingTrackedTokens = getState().tokens.trackedIds.filter(tokenId => {
            return (allTokenIds.indexOf(tokenId) > -1)
        })
        // load balances for tracked tokens
        if (existingTrackedTokens.length) {
            getState().addresses.allIds.forEach(addressId => {
                    dispatch(loadMultiTokenBalances(existingTrackedTokens, addressId))
                }
            )
        }
        // stop tracking non-existing tokens
        const trackedTokensToRemove = getState().tokens.trackedIds.filter(tokenId => {
            return (existingTrackedTokens.indexOf(tokenId) === -1)
        })
        trackedTokensToRemove.forEach(tokenId => {
            dispatch(changeTokenTracking(tokenId, false))
        })

        // Finished loading
        dispatch(tokenListStateChanged(TOKEN_LIST_STATES.INITIALIZED))
    }
}

function mapListToken(listToken) {
    return {
        id: listToken['address'],
        address: listToken['address'],
        symbol: listToken['symbol'],
        decimals: Math.pow(10, listToken['decimals']),
        name: listToken['name'],
        description: null,
        website: listToken['website'],
        imageUrl: null,

        supply: {
            loading: false,
            supply: undefined
        },
        balance: undefined,
        eventIds: [],
        loading: false,
    }
}

export function instantiateTokenContract(tokenID) {
    return (dispatch, getState) => {
        // create promise that resolves as soon as the contract is instantiated.
        const loadingPromise = new Promise(
            async function(resolve, reject) {
                // indicate we are loading the token
                dispatch(loadingTokenChanged(tokenID, true))
                // create token contract instance and store it for later use in state
                const token = getState().tokens.byId[tokenID]
                const {web3} = getState().web3Instance
                const ERC20Contract = contract({abi: erc20ABI})
                ERC20Contract.setProvider(web3.currentProvider)
                const contractInstance = await ERC20Contract.at(token.address)
                dispatch(setTokenContractInstance(tokenID, contractInstance))
                // indicate we finished loading the token
                dispatch(loadingTokenChanged(tokenID, false))
                // finally resolve loading promise
                resolve()
            }
        )
        dispatch(setTokenLoadingPromise(tokenID, loadingPromise))
    }
}

export function loadTokenSupply(tokenID) {
    return async (dispatch, getState) => {
        dispatch(loadingSupplyChanged(tokenID, true))
        await verifyContractInstance(tokenID, dispatch, getState)
        const volatileToken = getState().tokens.volatileById[tokenID]
        // obtain token contract instance from state
        const contractInstance = volatileToken.contractInstance
        const supply = await contractInstance.totalSupply()
        dispatch(setTokenSupply(tokenID, supply))
        dispatch(loadingSupplyChanged(tokenID, false))
    }
}

export function loadTokenBalance(tokenID, addressId) {
    return loadMultiTokenBalances([tokenID], addressId)
}

export function loadMultiTokenBalances(tokenIDs, addressId) {
    return async (dispatch, getState) => {
        tokenIDs.forEach(async tokenId => {
            dispatch(balanceStateChanged(tokenId, addressId, BALANCE_STATES.LOADING))
            await verifyContractInstance(tokenId, dispatch, getState)
            const volatileToken = getState().tokens.volatileById[tokenId]
            const address = getState().addresses.byId[addressId].address
            const balance = await volatileToken.contractInstance.balanceOf(address)
            dispatch(setBalanceByAddressAndToken(addressId, tokenId, balance))
            dispatch(balanceStateChanged(tokenId, addressId, BALANCE_STATES.INITIALIZED))
        })
    }
}

export function loadTokenTransferEvents(tokenID, fromBlock, toBlock, addresses) {
    return async (dispatch, getState) => {
        const chunkSize = 100
        const maxChunks = 100
        const maxEvents = 50

        let currentChunk = 1
        let numEvents = 0

        // if no from/toblock are provided, use default values
        if (fromBlock === 0)
            fromBlock = getState().web3Instance.block.number - (chunkSize * maxChunks)
        if (toBlock === 0)
            toBlock = getState().web3Instance.block.number

        dispatch(aceEntriesLoadingChangeWrapper(addresses, tokenID, true, fromBlock, toBlock, fromBlock))
        await verifyContractInstance(tokenID, dispatch, getState)
        const contractInstance = getState().tokens.volatileById[tokenID].contractInstance

        while ((currentChunk <= maxChunks) && (numEvents <= maxEvents)) {
            // calculate fromBlock for current chunk
            let currentFromBlock = fromBlock + ((currentChunk-1) * chunkSize)
            // calculate toBlock for current chunk
            let currentToBlock = currentFromBlock + chunkSize

            // update progress info
            dispatch(changeEventScanProps({
                tokenID,
                addresses,
                numEvents,
                currentChunk,
                maxEvents,
                maxChunks,
                fromBlock,
                toBlock,
                state: 'scanning'
            }))

            // obtain events for this chunk
            // console.log("Calling 'Transfer' from " + addresses + ", blockrange: " + currentFromBlock + " - " + currentToBlock)
            const transferEventsFrom = contractInstance.Transfer(
                {
                    // These are the standard ERC20 Transfer event fields
                    _from: addresses,    // addresses sending token
                    _to: null,      // addresses receiving token
                },
                {
                    fromBlock: currentFromBlock,
                    toBlock: currentToBlock,
                }
            )
            //console.log("Calling 'Transfer' to " + addresses + ", blockrange: " + currentFromBlock + " - " + currentToBlock)
            const transferEventsTo = contractInstance.Transfer(
                {
                    // These are the standard ERC20 Transfer event fields
                    _from: null,    // addresses sending token
                    _to: addresses,      // addresses receiving token
                },
                {
                    fromBlock: currentFromBlock,
                    toBlock: currentToBlock,
                }
            )

            // Wrap this into promise and await it, otherwise loading:false action will be dispatched too early!
            let eventPromises = []
            eventPromises.push(new Promise((resolve, reject) => {
                transferEventsFrom.get(function (error, events) {
                    if (error) {
                        console.error("Error getting events for token " + tokenID + ": " + error)
                        reject("Error getting events for token " + tokenID + ": " + error)
                    } else {
                        // console.log("Found " + events.length + " 'from' Events: " + events)
                        if (events.length) {
                            dispatch(addEventsThunk(events, tokenID))
                        }
                        resolve(events.length)
                    }
                })
            }))
            eventPromises.push(new Promise((resolve, reject) => {
                transferEventsTo.get(function (error, events) {
                    if (error) {
                        console.error("Error getting events for token " + tokenID + ": " + error)
                        reject("Error getting events for token " + tokenID + ": " + error)
                    } else {
                        //console.log("Found " + events.length + " 'to' Events: " + events)
                        if (events.length) {
                            dispatch(addEventsThunk(events, tokenID))
                        }
                        resolve(events.length)
                    }
                })
            }))
            // Wait till both promises are resolved and add up the found number of events.
            const loggedEvents = await Promise.all(eventPromises)
            const foundEvents = loggedEvents.reduce((a, b) => a + b, 0)

            dispatch(aceEntriesBlockRangeChange(addresses, tokenID, currentFromBlock, currentToBlock))
            // increment currentChunk
            currentChunk++
            // update numEvents with number of found events
            numEvents += foundEvents
        }

        dispatch(aceEntriesLoadingChange(addresses, tokenID, false, 0, 0, 0))
    }
}

async function verifyContractInstance(tokenId, dispatch, getState) {
    let volatileToken = getState().tokens.volatileById[tokenId]
    if (volatileToken === undefined) {
        // volatileToken is undefined if we rehydrated state from localstorage.
        // Create an entry to continue
        dispatch(addVolatileToken(tokenId))
        volatileToken = getState().tokens.volatileById[tokenId]
    }
    if (volatileToken.loadingPromise) {
        // token is already loading. Just return the promise.
        return volatileToken.loadingPromise
    }
    else {
        const token = getState().tokens.byId[tokenId]
        // console.log("Start lazyloading contract instance for " + token.id + " (" + token.name +")")
        dispatch(instantiateTokenContract(token.id))
        // refresh token, as the loadingPromise has just been added to state
        volatileToken = getState().tokens.volatileById[tokenId]
        return volatileToken.loadingPromise
    }
}

export const TRANSACTION_STATES = {
    IDLE: 'IDLE',
    INITIALIZING: 'INITIALIZING',
    WAITING_FOR_SIGNATURE: 'WAITING_FOR_SIGNATURE',
    WAITING_FOR_CONFIRMATION: 'WAITING_FOR_CONFIRMATION',
    CONFIRMED: 'CONFIRMED',
    FAILED: 'FAILED'
}

export function transferToken(tokenID, tokenAmount, fromAddress, toAddress) {
    return async (dispatch, getState) => {
        dispatch(changeTransactionState(TRANSACTION_STATES.INITIALIZING))
        // obtain token contract instance
        await verifyContractInstance(tokenID, dispatch, getState)
        const contractInstance = getState().tokens.volatileById[tokenID].contractInstance
        // TODO: check if eth balance is sufficient for required gas
        // TODO: check if token balance is sufficient

        dispatch(changeTransactionState(TRANSACTION_STATES.WAITING_FOR_SIGNATURE))
        // TODO: initialize transfer

        dispatch(changeTransactionState(TRANSACTION_STATES.WAITING_FOR_CONFIRMATION))

        // finalize transfer
        dispatch(changeTransactionState(TRANSACTION_STATES.CONFIRMED))
    }
}

export const CHANGE_TRANSACTION_STATE = 'CHANGE_TRANSACTION_STATE'
export function changeTransactionState(transactionState, message='') {
    return {
        type: CHANGE_TRANSACTION_STATE,
        payload: {
            transactionState,
            message
        }
    }
}
