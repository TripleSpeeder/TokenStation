import {addressByIdReducer} from './addressByIdReducer'
import {allAddressIdsReducer} from './allAddressIdsReducer'
import {combineReducers} from 'redux'

export const addresses = combineReducers({
    byId : addressByIdReducer,
    allIds : allAddressIdsReducer
});
