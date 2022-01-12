import {Link} from "react-router-dom";
import {deleteTransaction} from "../../services/transactionServise";

export default function Transaction ({transaction}) {

    const {sum, category, kind, user_name, createdAt, _id} = transaction;

    const del = async (e) => {
        e.preventDefault();
        await deleteTransaction(_id);
    }
    return (
        <div>
            {user_name} - {category}, {kind},{createdAt} - {sum}$
            <Link to={'/transaction/update'}><button>update</button></Link>
            <Link to={'/transactions'}><button onClick={del}>delete</button></Link>
            <hr/>
        </div>
    );
}
