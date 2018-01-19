import contract from 'truffle-contract'
import erc20ABI from 'human-standard-token-abi'
import {setBalanceByAddressAndToken} from '../balance/balanceActions'

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

export const CLEAR_TOKEN_BALANCES = 'CLEAR_TOKEN_BALANCES'
export function clearTokenBalances() {
    return {
        type: CLEAR_TOKEN_BALANCES,
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
export function changeFilterProps(filter, matchedTokenIds) {
    return {
        type: CHANGE_FILTER_PROPS,
        payload: {
            filter,
            matchedTokenIds
        }
    }
}

export const RESET_DISPLAY_COUNT = 'RESET_DISPLAY_COUNT'
export function resetDisplayCount() {
    return {
        type: RESET_DISPLAY_COUNT,
    }
}

export function setFilterString(filterString) {
    return (dispatch, getState) => {
        // Filter token list based on filterstring
        const searchString = filterString.toLowerCase()

        // in case filterstring changed, reset the number of displayed tokens to it's default value
        const oldFilterString = getState().tokens.listState.filter.toLowerCase()
        if (oldFilterString !== searchString){
            dispatch(resetDisplayCount())
        }

        let tokenIds = getState().tokens.allIds
        if (searchString.length) {
            const filteredTokens = Object.values(getState().tokens.byId).filter(o => {
                // get all tokens that have a matching name, symbol or address
                return (
                    o.name.toLowerCase().includes(searchString) ||
                    o.symbol.toLowerCase().includes(searchString) ||
                    o.address.toLowerCase().includes(searchString)
                )
            })
            // map tokens back to their tokenIDs
            tokenIds = filteredTokens.map(token => (token.id))
        }
        dispatch(changeFilterProps(searchString, tokenIds))
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

export function initialize(web3, registryABI, registryAddress) {
    return async (dispatch, getState) => {

        // check if existing data needs to be cleared
        const {state: tokenListState} = getState().tokens.listState
        if (tokenListState !== TOKEN_LIST_STATES.VIRGIN) {
            console.log("Clearing token list!")
            dispatch(clearTokenList())
            dispatch(tokenListStateChanged(TOKEN_LIST_STATES.VIRGIN))
        }

        dispatch(tokenListStateChanged(TOKEN_LIST_STATES.LOADING))

        // prepare access to Parity's token registry
        const registryContract = contract({abi: registryABI})
        registryContract.setProvider(web3.currentProvider)
        const registry = await registryContract.at(registryAddress)

        // get number of tokens in registry
        let tokenCount = await registry.tokenCount()
        tokenCount = tokenCount.toNumber()  // registry returns BigNum instance

        /* Limit number of tokens for debugging only */
        const limit=10
        if (tokenCount > limit) tokenCount = limit
        /* Limit number of tokens for debugging only */

        // Some tokens are invalid (address is 0x0), so they will screw up
        // the progress calculation. Track the number of valid tokens separately, so
        // the progress can reach 100% eventually
        let validTokenCount = tokenCount
        dispatch(changeValidTokenCount(validTokenCount))

        for (let id=0; id < tokenCount ; id++) {
            let parityToken = await registry.token(id)
            const address = parityToken[0]
            if (address ==='0x0000000000000000000000000000000000000000') {
                validTokenCount -= 1
                dispatch(changeValidTokenCount(validTokenCount))
                continue
            }
            // console.log("Got token " + id + ": " + parityToken[3] + " at " + address)
            const token = mapParityToken(id, parityToken)
            dispatch(addToken(id, token))

            // if there is already a filter set, re-evaluate the filter results
            const {filter} = getState().tokens.listState
            if (filter.length) {
                dispatch(filterNewToken(id))
            }
            // if there is already an address set, immediately check the balance
            getState().addresses.allIds.forEach(addressId => {
                    dispatch(loadTokenBalance(id, addressId))
                }
            )
        }
        // individual entries are still loading, but from List Module perspective I'm done
        dispatch(tokenListStateChanged(TOKEN_LIST_STATES.INITIALIZED))
    }
}

function mapParityToken(id, parityToken) {
    return {
        loading: false,
        loadingPromise: null,
        id: id,
        address: parityToken[0],
        symbol: parityToken[1],
        decimals: parityToken[2],
        name: parityToken[3],
        description: null,
        website: null,
        imageUrl: null,
        contractInstance: null,
        supply: {
            loading: true,
            supply: undefined
        },
        balance: undefined
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
                var t0 = performance.now();
                const contractInstance = await ERC20Contract.at(token.address)
                var t1 = performance.now();
                console.log("Instantiating contract took " + (t1 - t0) + " milliseconds for " + token.name)
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
        const token = getState().tokens.byId[tokenID]
        // obtain token contract instance from state
        const contractInstance = token.contractInstance
        const supply = await contractInstance.totalSupply()
        dispatch(setTokenSupply(tokenID, supply))
        dispatch(loadingSupplyChanged(tokenID, false))
    }
}

export function loadTokenBalance(tokenID, addressId) {
    return async (dispatch, getState) => {
        await verifyContractInstance(tokenID, dispatch, getState)
        const token = getState().tokens.byId[tokenID]
        const address = getState().addresses.byId[addressId].address
        const balance = await token.contractInstance.balanceOf(address)
        dispatch(setBalanceByAddressAndToken(addressId, tokenID, balance))
    }
}

async function verifyContractInstance(tokenId, dispatch, getState) {
    let token = getState().tokens.byId[tokenId]
    if (token.loadingPromise) {
        // token is already loading. Just return the promise.
        return token.loadingPromise
    }
    else {
        console.log("Start lazyloading contract instance for " + token.id + " (" + token.name +")")
        dispatch(instantiateTokenContract(token.id))
        // refresh token, as the loadingPromise has just been added to state
        token = getState().tokens.byId[tokenId]
        return token.loadingPromise
    }
}