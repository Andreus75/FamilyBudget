import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getTransactions} from "../../services/transactionServise";
import {GET_TRANSACTIONS} from "../../redux/actions/actions";
import Transaction from "../transaction/Transaction";

export default function Transactions () {

    let {transactionsReducer: {transactions}} = useSelector(state => state);
    let dispatch = useDispatch();
    useEffect(() => {
        getTransactions().then(value => {
            dispatch({type: GET_TRANSACTIONS, payload: value})
        });
    },[dispatch]);

    return (
        <div>
            <p>All transactions</p>
            {
                transactions.map(value => <Transaction key={value.id} transaction={value}/>)
            }
        </div>
    );
}
