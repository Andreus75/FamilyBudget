import {ADD_USER, DELETE_USER, GET_USER, GET_USERS, UPDATE_USER} from "../actions/actions";

let initialState = { users: [] }

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state, users: [...action.payload]};
        case GET_USER:
            return {...state, user: action.payload};
        case ADD_USER:
            return {...state, user: action.payload};
        case UPDATE_USER:
            return {...state, user: action.payload};
        case DELETE_USER:
            return state;
        default:
            return state;
    }
}

export { userReducer };
