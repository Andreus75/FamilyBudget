let url = "http://localhost:5000/transactions"

const getTransactions = async () => {
    const localData = localStorage.getItem('auth');
    return await fetch(url, {headers: {authorization: localData}}
    ).then(value => value.json());
}
const findFilterTransactions = async (start_data, end_data, user_name) => {
    const localData = localStorage.getItem('auth');
    return await fetch(url + '/filters?start_data=' + start_data + '&end_data=' + end_data + '&user_name=' + user_name, {headers: {authorization: localData}}).then(value => value.json());
}

const getTransactionById = async (transaction_id) => {
    const localData = localStorage.getItem('auth');
    await fetch(url + '/' + transaction_id, {headers: {authorization: localData}}).then(value => value.json());
}

const addTransaction = async (transaction) => {
    const localData = localStorage.getItem('auth');

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: localData,
        },
    }).then(response => response.json())
        .then((json) => console.log(json));
}

const deleteTransaction = async (transaction_id) => {
    const localData = localStorage.getItem('auth');
    await fetch(url + '/' + transaction_id, {
        method: 'DELETE'
    }, {headers: {authorization: localData}});
}

const updateTransaction = async (data, transaction_id) => {
    const localData = localStorage.getItem('auth');
    await fetch(url + '/' + transaction_id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            authorization: localData
        }
    }).then(response => response.json());
}

export {getTransactions, findFilterTransactions, getTransactionById, addTransaction, updateTransaction, deleteTransaction};
