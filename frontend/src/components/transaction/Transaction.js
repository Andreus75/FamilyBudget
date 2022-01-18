import {Link} from "react-router-dom";
import {deleteTransaction, updateTransaction} from "../../services/transactionServise";

export default function Transaction ({transaction, history}) {

    const {sum, category, kind, user_name, createdAt, _id} = transaction;

    const del = async (e) => {
        e.preventDefault();
        await deleteTransaction(_id);
    }

    const updateT = async (e) => {
        e.preventDefault();

        const data = {sum, category, kind};
        console.log(`/transaction/update/${transaction._id}`);
        history.push(`/transaction/update/${transaction._id}`);
    }

    return (
        <div>
            {user_name} - {category}, {kind},{createdAt} - {sum}$
            {/*<Link to={'/transaction/update'}>*/}
                <button onClick={updateT}>update</button>
            {/*</Link>*/}
            <Link to={'/transactions'}>
                <button className='btn_delete_transaction' onClick={del}>delete</button>
            </Link>
            <hr/>
        </div>
    );
}
