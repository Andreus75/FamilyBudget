import {
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    GET_TRANSACTION,
    GET_TRANSACTIONS,
    UPDATE_TRANSACTION,
    FILTER_TRANSACTION
} from "../actions/actions";

let initialState = { transactions: [], total: 0 }

const transactionsReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TRANSACTIONS:
            return {...state, transactions: action.payload.transactions, total: action.payload.total};
        case GET_TRANSACTION:
            return {...state, transactions: action.payload};
        case FILTER_TRANSACTION:
            return {...state, transactions: action.payload.transactions, total: action.payload.total};
        case ADD_TRANSACTION:
            return {...state, transactions: action.payload};
        case UPDATE_TRANSACTION:
            return {...state, transactions: action.payload};
        case DELETE_TRANSACTION:
            return state;
        default:
            return state;
    }
}

export { transactionsReducer };
