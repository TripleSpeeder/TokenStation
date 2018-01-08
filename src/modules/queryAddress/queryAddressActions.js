import {clearTokenBalances, loadTokenBalance} from '../token/tokenActions'

export const SET_QUERYADDRESS = 'SET_QUERYADDRESS'
export function setQueryAddress(address, valid) {
    return {
        type: SET_QUERYADDRESS,
        payload: {
            address: address,
            valid: valid
        }
    }
}

export function queryAddressChange(address, valid) {
    return (dispatch, getState) => {
        const {oldValid, oldAddress} = getState().queryAddress.valid
        if ((oldValid === valid) && (oldAddress === address)) {
            // no need to update anything
            return
        }
        dispatch(clearTokenBalances())
        dispatch(setQueryAddress(address, valid))
        if (valid) {
            // now query all known tokens for balances of given address
            Object.entries(getState().tokens.byId).forEach(
                async ([tokenId, token]) => {
                    console.log("Getting balance for " + token.name)
                    dispatch(loadTokenBalance(tokenId, address))
                }
            )
        }
    }
}
