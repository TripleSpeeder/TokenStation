import {addressByIdReducer} from './addressByIdReducer'
import {allAddressIdsReducer} from './allAddressIdsReducer'
import {combineReducers} from 'redux'

/*
State tree:
{
    addresses: {
        byId: {
            '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0': {
                '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
                ADDRESS_TYPE_EXTERNAL
            },
            '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0': {
                '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0',
                ADDRESS_TYPE_EXTERNAL
            },
            '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9': {
                '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9',
                ADDRESS_TYPE_OWNED
            }
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
    allIds : allAddressIdsReducer
});
