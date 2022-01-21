import './Transaction.css';
import { Link } from 'react-router-dom';
import { deleteTransaction } from '../../services/transactionServise';
import { useState } from 'react';

export default function Transaction ({ transaction, history }) {

    const { sum, category, kind, user_name, createdAt, _id } = transaction;

    const [error_message, setErrorMessage] = useState('');

    const del = async (e) => {
        e.preventDefault();

        const response = await deleteTransaction(_id);

        if (response.status !== 200) {
            setErrorMessage(response.data.msg);
        }
    }

    const updateT = async (e) => {
        e.preventDefault();

        history.push(`/transaction/update/${transaction._id}`);
    }

    return (
        <div>
            <p className="error_message">{error_message}</p>
            {user_name} - {category}, {kind},{createdAt} - {sum}$
            <button onClick={updateT}>update</button>

            <Link to={'/transactions'}>
                <button className='btn_delete_transaction' onClick={del}>delete</button>
            </Link>

            <hr/>

        </div>
    );
}
