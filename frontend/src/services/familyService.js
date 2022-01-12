import axios from "axios";

let url = 'http://localhost:5000/family';

const getFamily = () => {
    return fetch(url).then(value => value.json());
}

const getFamilyById = (family_id) => {
    fetch(url + '/' + family_id).then(value => value.json());
}

const addFamily = async (family) => {

    return await axios.post(url, family).then(res => console.log(res.data));
}

const deleteFamily = async (family_id) => {
    await fetch(url + '/' + family_id, {
        method: 'DELETE'
    });
}

export {getFamily, getFamilyById, addFamily, deleteFamily};
