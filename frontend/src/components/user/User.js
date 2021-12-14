export default function User ({user}) {
    console.log(user);
    const {full_name} = user;
    return (
        <div>
            <h4>{full_name}</h4>
        </div>
    );
}
