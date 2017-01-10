import axios from 'axios';

class noteApi {
    static getAll() {
        return axios.get('http://localhost:8080/notes')
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static createNote(note) {
        return axios.post('http://localhost:8080/notes', note)
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log(error);
            })
    }

    static removeNote(id) {
        return axios.delete(`http://localhost:8080/notes/${id}`)
            .then(function (response) {
                return response.data;
            }).catch(function (error) {
                console.log(error);
            })
    }
}

export default noteApi;

