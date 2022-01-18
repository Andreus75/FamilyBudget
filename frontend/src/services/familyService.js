import axios from "axios";

let url = 'http://localhost:5000/family';

const getFamily = async () => {
    const localData = localStorage.getItem('auth');
    return await fetch(url, {
            headers: {
                authorization: localData
        }}).then(value => value.json());
    // return await axios.get(url, {
    //     headers: {
    //         authorization: localData
    // }
    // }).then(res => console.log('getFamily' + res.data));
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
