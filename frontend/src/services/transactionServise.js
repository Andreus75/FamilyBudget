let url = "http://localhost:5000/transactions"

const getTransactions = async () => {
    return await fetch(url).then(value => value.json());
}
const findFilterTransactions = async (start_data, end_data, full_name_user) => {

    return await fetch(url + '/filters?start_data=' + start_data + '&end_data=' + end_data + '&full_name_user=' + full_name_user).then(value => value.json());
}

const getTransactionById = async (transaction_id) => {
    await fetch(url + '/' + transaction_id).then(value => value.json());
}

const addTransaction = async (transaction) => {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
        .then((json) => console.log(json));
}

const deleteTransaction = async (transaction_id) => {
    await fetch(url + '/' + transaction_id, {
        method: 'DELETE'
    });
}

const updateTransaction = async (data, transaction_id) => {
    await fetch(url + '/' + transaction_id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response => response.json());
}

export {getTransactions, findFilterTransactions, getTransactionById, addTransaction, updateTransaction, deleteTransaction};
