import {clearTokenBalances, loadTokenBalance} from '../token/tokenActions'
import {findBalanceId} from '../balance/balanceActions'

export const ADDRESS_TYPE_EXTERNAL='ADDRESS_TYPE_EXTERNAL'
export const ADDRESS_TYPE_OWNED='ADDRESS_TYPE_OWNED'
export const ADD_ADDRESS = 'ADD_ADDRESS'
export function addAddress(address, type) {
    return {
        type: ADD_ADDRESS,
        payload: {
            addressId: address,
            address,
            type
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

export function addNewAddress(address, type) {
    return (dispatch, getState) => {
        // a new address is added.
        dispatch(addAddress(address, type))
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
