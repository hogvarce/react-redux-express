import ACTIONS from './actionTypes';
import noteApi from '../api/noteApi';

export function loadNotesSuccess(notes) {
    return { type: ACTIONS.LOAD_NOTES, notes };
}

export function addNoteSuccess(note) {
    return { type: ACTIONS.ADD_NOTE, note };
}

export function removeNoteSuccess(notes) {
    return { type: ACTIONS.REMOVE_NOTE, notes };
}

export function loadNotes() {
    return dispatch => {
        return noteApi.getAll().then(notes => {
            dispatch(loadNotesSuccess(notes));
        }).catch(error => {
            throw(error);
        })
    }
}

export function addNote(note) {
    return dispatch => {
        return noteApi.createNote(note).then(note => {
            dispatch(addNoteSuccess(note));
        }).catch(error => {
            throw(error);
        })
    }
}

export function removeNote(id) {
      return dispatch => {
          return noteApi.removeNote(id).then(notes => {
              dispatch(removeNoteSuccess(notes));
          }).catch(error => {
              throw(error);
          })
      }
}