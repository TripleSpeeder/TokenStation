import {combineReducers} from 'redux'
import {eventByIdReducer} from './eventByIdReducer'
import {allEventIdsReducer} from './allEventIdsReducer'
import {addressContractEventsByIdReducer} from './addressContractEventsByIdReducer'
import {transferEventListStateReducer} from './listStateReducer'


export const events = combineReducers({
    byId : eventByIdReducer,
    allIds : allEventIdsReducer,
    aceById: addressContractEventsByIdReducer,
    listState: transferEventListStateReducer,
});
