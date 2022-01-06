import './RegistrationForm.css';
import { useState } from 'react';
import { login } from '../../services/authService';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

export default function RegistrationForm (props) {
    let { history } = props;
    // let {authReducer: {response}} = useSelector(state => state);
    let dispatch = useDispatch();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    // let [token, setToken] = useState('');

    let addUserName = (e) => {
        setEmail(e.target.value);
    }
    let addPassword = (e) => {
        setPassword(e.target.value);
    }

    let registration = async (e) => {
        e.preventDefault();
        let body = {email, password};
        const response = await login(body);
        // setToken(response.data.access_token);
        history.push('/transactions');
    }

    return (
        <div className="registration">
            <div>

            </div>
            <form className="form_registration" onSubmit={registration}>
                <h3>Please fill in this form to login your account.</h3>
                <input type="text" name={'email'} value={email} onChange={addUserName}
                       placeholder={'email'}/>
                <br/>
                <input type="text" name={'password'} value={password} onChange={addPassword}
                       placeholder={'password'}/>
                <br/>
                <button className="registration__btn">Login</button>
            </form>
            <Link to={'/auth/password/forgot'}><button className="forgot_password_btn">Forgot password</button></Link>

        </div>
    );
}
