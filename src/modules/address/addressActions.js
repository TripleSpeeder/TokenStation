import {clearTokenBalances, loadTokenBalance} from '../token/tokenActions'

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