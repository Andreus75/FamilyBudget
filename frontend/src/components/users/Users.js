import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers} from "../../services/userServices";
import {GET_USERS} from "../../redux/actions/actions";
import User from "../user/User";

export default function Users () {

    let {users} = useSelector(state => state);
    let dispatch = useDispatch();
    
    useEffect(() => {
        getUsers().then(value => dispatch({type: GET_USERS, payload: value}));
    }, [dispatch]);

    return (
        <div>
            {
                users.map(value => <User key={value.id} user={value}/>)
            }
        </div>
    );
}
