import './RegistrationForm.css';

import { useState } from 'react';

import { login } from '../../services/authService';
import { Link } from "react-router-dom";

export default function RegistrationForm (props) {
    let { history } = props;
    let [email, setEmail] = useState('');
    let [family_password, setFamilyPassword] = useState('');
    let [user_name, setUserName] = useState('');
    let [user_password, setUserPassword] = useState('');

    let addEmail = (e) => {
        setEmail(e.target.value);
    }
    let addFamilyPassword = (e) => {
        setFamilyPassword(e.target.value);
    }
    let addUserName = (e) => {
        setUserName(e.target.value || '');
    }
    let addUserPassword = (e) => {
        setUserPassword(e.target.value);
    }

    let registration = async (e) => {
        e.preventDefault();

        let body = {email, family_password, user_name, user_password };

        await login(body);

        history.push('/transactions');
    }

    return (
        <div className="registration">
            <div>
            </div>
            <form className="form_registration" onSubmit={registration}>
                <h3>Please fill in this form to login your account.</h3>
                <p>Login as family</p>
                <input type="text" name={'email'} value={email} onChange={addEmail} placeholder={'email'} required={true}/>
                <br/>
                <input type="text" name={'family_password'} value={family_password} onChange={addFamilyPassword} placeholder={'family password'} required={true}/>
                <br/>
                <p>+ login as user</p>
                <input type="text" name={'user_name'} value={user_name} onChange={addUserName} placeholder={'name'}/>
                <input type="text" name={'user_password'} value={user_password} onChange={addUserPassword} placeholder={'user password'}/>
                <br/>
                <button className="registration__btn">Login</button>
            </form>
            <Link to={'/auth/password/forgot'}><button className="forgot_password_btn">Forgot password</button></Link>

        </div>
    );
}
