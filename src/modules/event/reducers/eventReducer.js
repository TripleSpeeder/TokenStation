import {combineReducers} from 'redux'
import {eventByIdReducer} from './eventByIdReducer'
import {allEventIdsReducer} from './allEventIdsReducer'


export const events = combineReducers({
    byId : eventByIdReducer,
    allIds : allEventIdsReducer
});
