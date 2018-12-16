import {addressByIdReducer} from './addressByIdReducer'
import {allAddressIdsReducer} from './allAddressIdsReducer'
import {combineReducers} from 'redux'
import {addressSelectorReducer} from './addressSelectorReducer'

/*
State tree:
{
    addresses: {
        byId: {
            '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0': {
                address: '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
                type: ADDRESS_TYPE_EXTERNAL,
                balancesState: 'virgin',
                eventIds: []
            },
            ...
        }

        allIds: [
            '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
            '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0',
            '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9'
        ]
    }
}
*/

export const addresses = combineReducers({
    byId : addressByIdReducer,
    allIds : allAddressIdsReducer,
    selector: addressSelectorReducer,
});
