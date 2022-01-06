export default function Transaction ({transaction}) {
    const {sum, category, kind, user_name, createdAt} = transaction;
    return (
        <div>
            {user_name} - {category}, {kind},{createdAt} - {sum}$
            <button>update</button>
            <button>delete</button>
            <hr/>
        </div>
    );
}
