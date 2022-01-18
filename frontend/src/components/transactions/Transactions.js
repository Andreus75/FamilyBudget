import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTransactions} from "../../services/transactionServise";
import {GET_TRANSACTIONS} from "../../redux/actions/actions";
import Transaction from "../transaction/Transaction";
import { Link } from "react-router-dom";

export default function Transactions (props) {
    const { history } = props;

    let {transactionsReducer: {transactions, total}} = useSelector(state => state);
    let dispatch = useDispatch();

    useEffect(() => {
        getTransactions().then(value => {
            dispatch({type: GET_TRANSACTIONS, payload: value});
        });
    },[dispatch]);

    return (
        <div>
            <h3>All transactions</h3>
            <hr/>
            <div className='filter_nav'>
                <Link to={'/createUser'}>
                    <button>Create User</button>
                </Link>
                <Link to={'/createTransaction'}>
                    <button>Create transaction</button>
                </Link>
            </div>
            <hr/>
            {
                transactions.map(value => <Transaction key={value.id} transaction={value} history={history}/>)
            }
            <h3>Total : {total}$</h3>
        </div>
    );
}
