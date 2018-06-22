import {loadTokenBalance} from '../token/tokenActions'

export const BALANCE_STATES = {
    VIRGIN: 'virgin',
    LOADING: 'loading',
    INITIALIZED: 'initialized',
    HYDRATED_WHILE_LOADING: 'hydrated_while_loading'
}

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

export const SET_BALANCE_STATE = 'SET_BALANCE_STATE'
export function setBalanceState(balanceId, balanceState) {
    return {
        type: SET_BALANCE_STATE,
        payload: {
            balanceId,
            balanceState,
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

export const DELETE_BALANCE_ENTRY = 'DELETE_BALANCE_ENTRY'
export function deleteBalanceEntry(balanceId) {
    return {
        type: DELETE_BALANCE_ENTRY,
        payload: {
            balanceId,
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
    }
}

export function balanceStateChanged(tokenId, addressId, balanceState) {
    return(dispatch, getState) => {
        // obtain balanceID
        let balanceId = buildBalanceId(addressId, tokenId)
        if (getState().balance.byId[balanceId] === undefined) {
            // create a new balance entry before setting balance
            dispatch(createBalanceEntry(balanceId, addressId, tokenId))
        }
        // set loading state
        dispatch(setBalanceState(balanceId, balanceState))
    }
}

export function reloadBalance(balanceId) {
    return (dispatch, getState) => {
        const balance = getState().balance.byId[balanceId]
        dispatch(loadTokenBalance(balance.tokenId, balance.addressId))
    }
}

export function clearTokenBalances(tokenId) {
    return (dispatch, getState) => {
        const balancesToClear = Object.values(getState().balance.byId).filter(balanceEntry => {
            return (balanceEntry.tokenId === tokenId)
        })
        balancesToClear.forEach(balanceEntry => {
            dispatch(deleteBalanceEntry(balanceEntry.balanceId))
        })
    }
}

export function buildBalanceId(addressId, tokenId) {
    return (addressId + '-' + tokenId)
}
