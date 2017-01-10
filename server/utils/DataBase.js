import mongoose from 'mongoose';
import Note from '../models/note';
import config from '../../etc/config.json';

mongoose.Promise = global.Promise;

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listNotes() {
    return Note.find();
}

export function createNote(data) {
    let note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });
    return note.save();
}

export function removeNote(id) {
    return Note.findById(id).remove();
}
