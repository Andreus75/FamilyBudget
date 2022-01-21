let url = "http://localhost:5000/users"

const getUsers = async () => {
    try {
        const localData = localStorage.getItem('auth');

        return await fetch(url, {headers: {authorization: localData}}).then(value => value.json());
    } catch (e) {
        console.log('errrrrrrr');
        console.log(e);
    }

}

const getUserById = async (user_id) => {
    await fetch(url + '/' + user_id).then(value => value.json());
}

const addUser = async (user) => {
    // try {
        const localData = localStorage.getItem('auth');

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                authorization: localData,
            },
        }).then(response => response.json())
            .then((json) => console.log(json))
            .catch(response => console.log(response))
    // } catch (e) {
    //     console.log(e.response);
    //     return e.response;
    // }

}

const deleteUser = async (user_id) => {
    try {
        const localData = localStorage.getItem('auth');
        const response = await fetch(url + '/' + user_id, {
            method: 'DELETE'
        });
    } catch (e) {
        console.log('error');
        console.log(e.response.data);
    }
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
