import { useSelector } from 'react-redux';
import Transaction from '../transaction/Transaction';

export default function TransactionsFilter () {

    let {transactionsReducer: {transactions, total}} = useSelector(state => state);

    return (
        <div>
            <p>Transactions</p>
            Total : {total}
            <br/>
            {
                transactions.map(value => <Transaction key={value.id} transaction={value}/>)
            }
        </div>
    );
}
