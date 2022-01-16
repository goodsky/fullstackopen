import axios from 'axios'

const personsUrl = '/api/persons';

const getAll = () => axios
    .get(personsUrl)
    .then(response => response.data)
    .catch(error => {
        alert('Failed to load phonebook from server', error);
    });

const create = (newPerson) => axios
    .post(personsUrl, newPerson)
    .then(response => response.data);

const remove = (id) => axios
    .delete(`${personsUrl}/${id}`)
    .then(response => undefined);

const update = (id, updatedPerson) => axios
    .put(`${personsUrl}/${id}`, updatedPerson)
    .then(response => response.data);

export default {
    getAll,
    create,
    remove,
    update,
};