import './RegistrationForm.css';
import { useState } from 'react';
import { login } from '../../services/authService';
import {Link} from "react-router-dom";

export default function RegistrationForm () {

    let [user_name, setUserName] = useState('');
    let [password, setPassword] = useState('');

    let addUserName = (e) => {
        setUserName(e.target.value);
    }
    let addPassword = (e) => {
        setPassword(e.target.value);
    }

    let registration = (e) => {
        e.preventDefault();
        let body = {user_name, password};
        login(body);
    }

    return (
        <div>
            <form className="form_registration" onSubmit={registration}>
                <h3>Please fill in this form to login your account.</h3>
                <input type="text" name={'user_name'} value={user_name} onChange={addUserName}
                       placeholder={'login'}/>
                <br/>
                <input type="text" name={'password'} value={password} onChange={addPassword}
                       placeholder={'password'}/>
                <br/>
                <button>Registration</button>
            </form>
            <Link to={'/auth/password/forgot'}><button>Forgot password</button></Link>
        </div>
    );
}
