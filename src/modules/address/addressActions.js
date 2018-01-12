import {clearTokenBalances, loadTokenBalance} from '../token/tokenActions'
import {findBalanceId} from '../balance/balanceActions'

export const ADD_ADDRESS = 'ADD_ADDRESS'
export function addAddress(address) {
    return {
        type: ADD_ADDRESS,
        payload: {
            addressId: address,
            address
        }
    }
}

export const REMOVE_ADDRESS='REMOVE_ADDRESS'
export function removeAddress(addressId) {
    return {
        type: REMOVE_ADDRESS,
        payload: {
            addressId
        }
    }
}

export function addNewAddress(address) {
    return (dispatch, getState) => {
        // a new address is added.
        dispatch(addAddress(address))
        // get ID of new address
        const addressId = findAddressId(address)
        // Dispatch actions to obtain balance for all known tokens
        getState().tokens.allIds.forEach(tokenId => {
            const balanceId = findBalanceId(getState().balance.byId, addressId, tokenId)
            if (balanceId === -1) {
                dispatch(loadTokenBalance(tokenId, addressId))
            }
        })
    }
}

export function findAddressId(address) {
    // Quick implementation as I know that the ID is the same as the actual address...
    // TODO: Real implementation: Search through addresses and return ID of found address entry
    return address
}

/*
export function queryAddressChange(address, valid) {
    return (dispatch, getState) => {
        const {oldValid, oldAddress} = getState().address.valid
        if ((oldValid === valid) && (oldAddress === address)) {
            // no need to update anything
            return
        }
        dispatch(clearTokenBalances())
        dispatch(setQueryAddress(address, valid))
        if (valid) {
            // now query all known tokens for balance of given address
            Object.entries(getState().tokens.byId).forEach(
                async ([tokenId, token]) => {
                    console.log("Getting balance for " + token.name)
                    dispatch(loadTokenBalance(tokenId, address))
                }
            )
        }
    }
}
*/