import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { getTransactions } from "../../services/transactionServise";
import { GET_TRANSACTIONS } from "../../redux/actions/actions";
import Transaction from "../transaction/Transaction";
import { Link } from "react-router-dom";
import { deleteFamily } from "../../services/familyService";

export default function Transactions (props) {
    const { history } = props;

    const [error_message, setErrorMessage] = useState('');

    let {transactionsReducer: {transactions, total}} = useSelector(state => state);
    let dispatch = useDispatch();

    useEffect(() => {
        getTransactions().then(value => {
            dispatch({type: GET_TRANSACTIONS, payload: value});
        });
    },[dispatch]);

    const delete_family = async () => {
        const response = await deleteFamily();

        if (response.status !== 200) {
            setErrorMessage(response.data.msg);
        }
    }

    return (
        <div>
            <h3>All transactions</h3>
            <hr/>
            <p className="error_message">{error_message}</p>
            <div className='filter_nav'>
                <Link to={'/createUser'}>
                    <button>Create User</button>
                </Link>
                <Link to={'/createTransaction'}>
                    <button>Create transaction</button>
                </Link>
                <button onClick={delete_family}>Delete Family</button>
            </div>
            <hr/>
            {
                transactions.map(value => <Transaction key={value.id} transaction={value} history={history}/>)
            }
            <h3>Total : {total}$</h3>
        </div>
    );
}
