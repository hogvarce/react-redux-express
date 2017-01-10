import ACTIONS from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.notes, action){
    switch(action.type) {
        case ACTIONS.LOAD_NOTES:
            return action.notes;
        case ACTIONS.ADD_NOTE:
            return [...state, action.note];
        case ACTIONS.REMOVE_NOTE:
            return action.notes;
        default:
            return state;
    }
}