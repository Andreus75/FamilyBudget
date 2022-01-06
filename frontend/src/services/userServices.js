let url = "http://localhost:5000/users"

const getUsers = async () => {
    const localData = localStorage.getItem('auth');

    return await fetch(url, {headers: {authorization: localData}}).then(value => value.json());
}

const getUserById = async (user_id) => {
    await fetch(url + '/' + user_id).then(value => value.json());
}

const addUser = async (user) => {
    const localData = localStorage.getItem('auth');

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: localData,
        },
    }).then(response => response.json())
        .then((json) => console.log(json));
}

const deleteUser = async (user_id) => {
    const localData = localStorage.getItem('auth');
    await fetch(url + '/' + user_id, {
        method: 'DELETE'
    });
}

const updateUser = async (data, user_id) => {
    const localData = localStorage.getItem('auth');
    await fetch(url + '/' + user_id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: localData,
        }
    }).then(response => response.json());
}

export {addUser, getUsers, getUserById, updateUser, deleteUser};
