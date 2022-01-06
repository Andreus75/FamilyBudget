export default function User ({user}) {
    console.log(user);
    const {full_name} = user;
    return (
        <div>
            <p>{full_name}</p><button>Update</button><button>Delete</button><hr/>
        </div>
    );
}
