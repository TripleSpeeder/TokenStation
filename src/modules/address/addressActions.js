import {loadMultiTokenBalances} from '../token/tokenActions'
import {clearAddressBalances} from '../balance/balanceActions'
import {storeLocalData, WATCHED_ADDRESSES} from "../../utils/localStorageWrapper"

export const ADDRESS_TYPE_EXTERNAL='ADDRESS_TYPE_EXTERNAL'
export const ADDRESS_TYPE_OWNED='ADDRESS_TYPE_OWNED'
export const ADDRESS_BALANCES_STATES = {
    VIRGIN: 'virgin',
    LOADING: 'loading',
    INITIALIZED: 'initialized',
}

export const CHANGE_ADDRESS_BALANCES_STATE = 'CHANGE_ADDRESS_BALANCES_STATE'
export function addressBalancesStateChanged(addressId, addressBalancesState) {
    return {
        type: CHANGE_ADDRESS_BALANCES_STATE,
        payload: {
            addressId,
            addressBalancesState
        }
    }
}

export const ADD_ADDRESS = 'ADD_ADDRESS'
export function addAddress(address, ensName, type) {
    return {
        type: ADD_ADDRESS,
        payload: {
            addressId: address,
            address,
            ensName,
            type
        }
    }
}


export function removeAddressThunk(addressId) {
    return (dispatch, getState) => {
        // remove from state
        dispatch(removeAddress(addressId))
        // remove all balance entries
        dispatch(clearAddressBalances(addressId))
        // update localStorage
        const addressesToStore = Object.values(getState().addresses.byId).map(o => (
            {
                address: o.address,
                ensName: o.ensName
            })
        )
        storeLocalData(WATCHED_ADDRESSES, addressesToStore)
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

export function addNewAddress(address, ensName, type) {
    return (dispatch, getState) => {
        // a new address is added.
        // make sure that all addresses are stored in lowercase
        address = address.toLowerCase()
        // add address to store
        dispatch(addAddress(address, ensName, type))
        // save address in localStorage
        const addressesToStore = Object.values(getState().addresses.byId).map(o => (
            {
                address: o.address,
                ensName: o.ensName
            })
        )
        storeLocalData(WATCHED_ADDRESSES, addressesToStore)
        // If i'm tracking tokens start getting balance right away
        const trackedIds = getState().tokens.trackedIds
        if (trackedIds.length) {
            // load balance for all tracked tokens
            dispatch(loadMultiTokenBalances(trackedIds, address))
        }
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
            dispatch(addNewAddress(account, '', ADDRESS_TYPE_OWNED))
        })
    }
}

export const CHANGE_SELECTOR_ADDRESSID = 'CHANGE_SELECTOR_ADDRESSID'
export function changeSelectorAddressId(selectedAddressId) {
    return {
        type: CHANGE_SELECTOR_ADDRESSID,
        payload: {
            selectedAddressId,
        }
    }
}
