import './TransactionsFilter.css';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Transaction from '../transaction/Transaction';
import {useEffect} from "react";
import {getTransactions} from "../../services/transactionServise";
import {GET_TRANSACTIONS} from "../../redux/actions/actions";

export default function TransactionsFilter () {

    let {transactionsReducer: {transactions, total}} = useSelector(state => state);
    let dispatch = useDispatch();

    useEffect(async () => {
        await getTransactions().then(value => {
            dispatch({type: GET_TRANSACTIONS, payload: value});
        });
    },[dispatch]);

    return (
        <div>
            <p>Transactions</p>
            <hr/>
            <div className='filter_nav'>
                <Link to={'/createUser'}>
                    <button>Create User</button>
                </Link>
                <Link to={'/createTransaction'}>
                    <button>Create transaction</button>
                </Link>
            </div>
            <br/>
            <hr/>
            {
                transactions.map(value => <Transaction key={value.id} transaction={value}/>)
            }
            <h3>Total : {total}$</h3>
        </div>
    );
}
