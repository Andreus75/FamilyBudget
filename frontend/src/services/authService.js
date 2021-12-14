let url = "http://localhost:5000/auth";

const login = (body) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then((json) => console.log(json));
}
const forgotPassword = (email) => {
    fetch(url + '/password/forgot', {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then((json) => console.log(json));
}
const setNewPassword = (password) => {
    fetch(url + '/password/forgot', {
        method: 'PUT',
        body: JSON.stringify(password),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then((json) => console.log(json));
}

export {login, forgotPassword, setNewPassword};

