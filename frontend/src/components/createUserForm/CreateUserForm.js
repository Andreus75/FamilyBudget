import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUser } from "../../services/userServices";
import { ADD_USER } from "../../redux/actions/actions";


export default function CreateUserForm (props) {
    let { history } = props;
    let dispatch = useDispatch();

    let [name, setName] = useState('');
    let [born, setBorn] = useState('');
    let [email, setEmail] = useState('');
    let [avatar, setAvatar] = useState('');
    let [status, setStatus] = useState('');
    let [role, setRole] = useState('');
    let [password, setUserPassword] =useState('');

    let addUserName = (e) => {
        setName(e.target.value);
    }
    let addUserBorn = (e) => {
        setBorn(e.target.value);
    }
    let addUserEmail = (e) => {
        setEmail(e.target.value);
    }
    let addUserAvatar = (e) => {
        setAvatar(e.target.value);
    }
    let changeStatus = (e) => {
        setStatus(e.target.value);
    }
    let changeRole = (e) => {
        setRole(e.target.value);
    }
    let addUserPassword = (e) => {
        setUserPassword(e.target.value);
    }

    let save = (e) => {
        e.preventDefault();
        let newUser = {name, born, email, status, role, avatar, password};
        addUser(newUser).then(value => {
            dispatch({type: ADD_USER, payload: value})
        });
        history.push('/transactions');
    }

    return (
        <div>
            <form onSubmit={save}>
                <h3>Create new User</h3>
                <input type="text" name={'name'} value={name} onChange={addUserName} maxLength={20} placeholder={'user name'}/>
                <br/>
                <input type="text" name={'born'} value={born} onChange={addUserBorn} maxLength={20} placeholder={'born'}/>
                <br/>
                <select name="select" onChange={changeStatus} placeholder={'status'}>
                    <option name="value" value={"working"}>working</option>
                    <option name="value" value={"unemployed"}>unemployed</option>
                    <option name="value" value={"student"}>student</option>
                    <option name="value" value={"pensioner"}>pensioner</option>
                </select>
                <br/>
                <select name="select" onChange={changeRole} placeholder={'role'}>
                    <option name="value" value={"admin"}>admin</option>
                    <option name="value" value={"user"}>user</option>
                </select>
                <br/>
                <input type="text" name={'email'} value={email} onChange={addUserEmail} placeholder={'email'}/>
                <br/>
                <input type="text" name={'user_password'} value={password} onChange={addUserPassword} placeholder={'user password'}/>
                <br/>
                <input type="text" name={'avatar'} value={avatar} onChange={addUserAvatar} placeholder={'avatar'}/>
                <br/>
                <button>Create User</button>
            </form>
        </div>
    );
}
