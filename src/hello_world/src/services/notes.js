import axios from 'axios';

const baseUrl = 'http://localhost:3001/notes';

const get = id => {
    return axios.get(`${baseUrl}/${id}`);
}

const getAll = () => {
    return axios.get(baseUrl);
};

const create = newNote => {
    return axios.post(baseUrl, newNote);
};

const update = (id, updatedNote) => {
    return axios.put(`${baseUrl}/${id}`, updatedNote);
};

export default {
    get: get,
    getAll: getAll,
    create: create,
    update: update,
};
