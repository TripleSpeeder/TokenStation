import {loadTokenBalance} from '../token/tokenActions'

export const SET_BALANCE = 'SET_BALANCE'
export function setBalance(balanceId, balance) {
    return {
        type: SET_BALANCE,
        payload: {
            balanceId,
            balance,
        }
    }
}

export const SET_BALANCE_LOADING = 'SET_BALANCE_LOADING'
export function setBalanceLoading(balanceId, isLoading) {
    return {
        type: SET_BALANCE_LOADING,
        payload: {
            balanceId,
            isLoading,
        }
    }
}

export const CREATE_BALANCE_ENTRY = 'CREATE_BALANCE_ENTRY'
export function createBalanceEntry(balanceId, addressId, tokenId) {
    return {
        type: CREATE_BALANCE_ENTRY,
        payload: {
            balanceId,
            addressId,
            tokenId
        }
    }
}

export function setBalanceByAddressAndToken(addressId, tokenId, balance) {
    return(dispatch, getState) => {
        let balanceId = buildBalanceId(addressId, tokenId)
        if (getState().balance.byId[balanceId] === undefined) {
            // create a new balance entry before setting balance
            dispatch(createBalanceEntry(balanceId, addressId, tokenId))
        }
        // set balance
        dispatch(setBalance(balanceId, balance))
        /*
        let balanceId = findBalanceId(getState().balance.byId, addressId, tokenId)
        if (balanceId === -1) {
            // create a new balance entry before setting balance
            balanceId = getState().balance.allIds.length
            dispatch(createBalanceEntry(balanceId, addressId, tokenId))
        }
        // set balance
        dispatch(setBalance(balanceId, balance))
        */
    }
}

export function loadingBalanceChanged(tokenId, addressId, isLoading) {
    return(dispatch, getState) => {
        // obtain balanceID
        let balanceId = buildBalanceId(addressId, tokenId)
        if (getState().balance.byId[balanceId] === undefined) {
            // create a new balance entry before setting balance
            dispatch(createBalanceEntry(balanceId, addressId, tokenId))
        }
        // set loading state
        dispatch(setBalanceLoading(balanceId, isLoading))
        /*
        // obtain balanceID
        let balanceId = findBalanceId(getState().balance.byId, addressId, tokenId)
        if (balanceId === -1) {
            // create a new balance entry
            balanceId = getState().balance.allIds.length
            dispatch(createBalanceEntry(balanceId, addressId, tokenId))
        }
        // set loading state
        dispatch(setBalanceLoading(balanceId, isLoading))
        */
    }
}


export function reloadBalance(balanceId) {
    return (dispatch, getState) => {
        const balance = getState().balance.byId[balanceId]
        dispatch(loadTokenBalance(balance.tokenId, balance.addressId))
    }
}

export function buildBalanceId(addressId, tokenId) {
    return (addressId + '-' + tokenId)
}
