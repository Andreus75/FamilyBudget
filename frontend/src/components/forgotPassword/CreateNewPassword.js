import {useState} from "react";
import {setNewPassword} from "../../services/authService";

export default function CreateNewPassword () {

    let [password, setPassword] = useState('');

    let addPassword = (e) => {
        setPassword(e.target.value);
    }

    let addNewPassword = (e) => {
        e.preventDefault();

        setNewPassword({password});
    }

    return (
        <div>
            <p>new password</p>
            <form onSubmit={addNewPassword}>
                <input type="text" name={'password'} value={password} onChange={addPassword} placeholder={'password'}/>
                <button>Create new password</button>
            </form>
        </div>
    );
}
