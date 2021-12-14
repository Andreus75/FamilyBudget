export default function Transaction ({transaction}) {
    const {sum, category, kind, full_name_user, createdAt} = transaction;
    return (
        <div>
            {full_name_user}, {category}, {kind},{createdAt}, {sum}$
        </div>
    );
}
