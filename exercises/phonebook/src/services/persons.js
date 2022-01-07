import axios from 'axios'

const personsUrl = 'http://localhost:3001/persons';

const getAll = () => axios
    .get(personsUrl)
    .then(response => response.data)
    .catch(error => {
        alert('Failed to load phonebook from server', error);
    });

const create = (newPerson) => axios
    .post(personsUrl, newPerson)
    .then(response => response.data)
    .catch(error => {
        alert('Failed to create person', error);
    });

const remove = (id) => axios
    .delete(`${personsUrl}/${id}`)
    .then(response => undefined)
    .catch(error => {
        alert('Failed to delete person', error);
    });

const update = (id, updatedPerson) => axios
    .put(`${personsUrl}/${id}`, updatedPerson)
    .then(response => response.data)
    .catch(error => {
        alert('Failed to update person', error);
    });

export default {
    getAll,
    create,
    remove,
    update,
};