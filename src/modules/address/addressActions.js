import {loadTokenBalance} from '../token/tokenActions'
import {buildBalanceId} from '../balance/balanceActions'

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

export const CHANGE_ADDRESS_TYPE='CHANGE_ADDRESS_TYPE'
export function changeAddressType(addressId, newType) {
    return {
        type: CHANGE_ADDRESS_TYPE,
        payload: {
            addressId,
            newType,
        }
    }
}

function batchGetBalances(timestamp, startIndex, addressId, dispatch, getState) {
    const allIds = getState().tokens.allIds
    let diff = 0
    let index = startIndex
    while ((diff < 10) && (index < allIds.length)) {
        const tokenId = allIds[index]
        const balanceId = buildBalanceId(addressId, tokenId)
        if (getState().balance.byId[balanceId] === undefined) {
            dispatch(loadTokenBalance(tokenId, addressId))
        }
        index++
        diff = performance.now()-timestamp
    }
    // 10 ms have passed
    if (index < allIds.length) {
        console.log("Batch update with index " + index)
        requestAnimationFrame((timestamp) => {
            batchGetBalances(timestamp, index, addressId, dispatch, getState)
        })
    }
}

export function addNewAddress(address, type) {
    return (dispatch, getState) => {
        // a new address is added.
        dispatch(addAddress(address, type))
        // get ID of new address
        const addressId = findAddressId(address)
        batchGetBalances(performance.now(), 0, addressId, dispatch, getState)
    }
}

export function changeOwnAddresses(accounts) {
    // for each account in accounts:
    // -> if it is not in addresses, add it
    // -> if it is in addresses, but marked as "external", change type to "owned"
    return (dispatch, getState) => {
        const addressesById = getState().addresses.byId

        const newAccounts = accounts.filter(account => {
            const existingAddress = Object.values(addressesById).filter(entry => {
                return (entry.address === account)
            })
            if (existingAddress.length > 0) {
                // check if the type has changed
                if (existingAddress[0].type !== ADDRESS_TYPE_OWNED){
                    console.log("Changing address " + existingAddress[0].address + " type to Owned!")
                    dispatch(changeAddressType(existingAddress[0].address, ADDRESS_TYPE_OWNED))
                }
                return false // address already known
            }
            return true // address needs to be added
        })

        // now check if there is any address currently marked as owned that is no more in accounts
        const makeExternal = Object.values(addressesById).filter(entry => {
            if (entry.type === ADDRESS_TYPE_OWNED) {
                // if this OWNED address is not in accounts array it needs to change to EXTERNAL!
                const idx = accounts.indexOf(entry.address)
                return (idx === -1)
            }
            return false
        })

        // make old owned addresses external
        makeExternal.forEach(address => {
            dispatch(changeAddressType(address.address, ADDRESS_TYPE_EXTERNAL))
        })

        // add all new addresses
        newAccounts.forEach(account => {
            dispatch(addNewAddress(account, ADDRESS_TYPE_OWNED))
        })
    }
}

export function findAddressId(address) {
    // Quick implementation as I know that the ID is the same as the actual address...
    // TODO: Real implementation: Search through addresses and return ID of found address entry
    return address
}
