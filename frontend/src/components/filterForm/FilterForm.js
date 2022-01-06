import './FilterForm.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FILTER_TRANSACTION, GET_USERS } from "../../redux/actions/actions";
import { getUsers } from "../../services/userServices";
import { findFilterTransactions } from "../../services/transactionServise";

export default function FilterForm (props) {

    const { history } = props;

    let { userReducer: { users } } = useSelector(state => state);
    let dispatch = useDispatch();
    let [user_name, setUserName] = useState('');
    let [start_data, setStart_data] = useState('');
    let [end_data, setEnd_data] = useState('');

    useEffect(() => {
        getUsers().then(value => {
            dispatch({type: GET_USERS, payload: value});
        });
    },[dispatch]);

    let selectUser = (e) => {
        const id = e.target.value;
        let userById = users.find(value => value._id === id);
        if (userById) {
            setUserName(userById.name || '');
        } else {
            setUserName('');
        }
    }
    const addStartData = (e) => {
        let start_data = e.target.value;
        setStart_data(start_data || '');
    }
    const addEndData = (e) => {
        let end_data = e.target.value;
        setEnd_data(end_data || '');
    }

    const filterTransaction = (e) => {
        e.preventDefault();

        findFilterTransactions(start_data, end_data, user_name).then(value => {
            dispatch({type: FILTER_TRANSACTION, payload: value});
        });

        history.push('/transactions/filter');
    }

    return (
        <div>
            <p>Filter Transactions</p>
            <hr/>
            <form className={'filter_form'} onSubmit={filterTransaction}>
                <select className={'select_filter'} onChange={selectUser}>
                    <option name="value" value={'all users'}>all users</option>
                    {
                        users.map(value =>
                            <option name="value" value={value.id} defaultValue={value.name}>
                                {value.name}
                            </option>
                        )
                    }
                </select>
                <br/>
                <input type="date" name={'start_data'} value={start_data} onInput={addStartData}/>
                <input type="date" name={'end_data'} value={end_data} onInput={addEndData}/>
                <button>filter</button>
            </form>
        </div>
    );
}
