import {SET_FAMILY_DATA} from "../actions/actions";

let initialState = { family_id: null, email: null, password: null };

const familyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FAMILY_DATA:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export { familyReducer };
