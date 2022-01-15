import axios from "axios";

let url = 'http://localhost:5000/family';

const getFamily = async () => {
    const localData = localStorage.getItem('auth');
    // fetch(url).then(value => value.json());
    await axios.get(url, {
        headers: {
            authorization: localData
    }
    }).then(res => res.data);
}

const addFamily = async (family, avatar) => {
    const fileField = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('family_name', family.family_name);
    formData.append('email', family.email);
    formData.append('password', family.password);
    formData.append('avatar', fileField.files[0]);
    return await axios.post(url, formData, {
        headers: {
            "Content-type": "multipart/form-data"
        }
    }).then(res => console.log(res.data));
}

const deleteFamily = async (family_id) => {
    await fetch(url + '/' + family_id, {
        method: 'DELETE'
    });
}

export {getFamily, addFamily, deleteFamily};
