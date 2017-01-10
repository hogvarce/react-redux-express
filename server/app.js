import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/DataBase';
import {serverPort} from '../etc/config.json';

db.setUpConnection();

const app = express();

var allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}

app.use(bodyParser.json());
app.use(allowCrossDomain);

app.get('/notes', (req, res) => {
    db.listNotes().then(data => {
        res.send(data);
    });
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => {
        res.send(data);
    });
});

app.delete('/notes/:id', (req, res) => {
    db.removeNote(req.params.id).then(() => {
        db.listNotes().then(data => {
            res.send(data);
        });
    });
});

const server = app.listen(serverPort, () => {
    console.log(`server run on port ${serverPort}`);
});
