import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser } from "../../services/userServices";
import {ADD_USER} from "../../redux/actions/actions";


export default function CreateUserForm () {

    let {userReducer: {users}} = useSelector(state => state);
    let dispatch = useDispatch();

    let [user_name, setUserName] = useState('');
    let [full_name, setFullName] = useState('');
    let [born, setBorn] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [avatar, setAvatar] = useState('');
    let [status, setStatus] = useState('');
    let [role, setRole] = useState('');

    let addUserName = (e) => {
        setUserName(e.target.value);
    }
    let addUserFullName = (e) => {
        setFullName(e.target.value);
    }
    let addUserBorn = (e) => {
        setBorn(e.target.value);
    }
    let addUserEmail = (e) => {
        setEmail(e.target.value);
    }
    let addUserPassword = (e) => {
        setPassword(e.target.value);
    }
    let addUserAvatar = (e) => {
        setAvatar(e.target.value);
    }
    let inputStatus = (e) => {
        setStatus(e.target.value);
    }
    let inputRole = (e) => {
        setRole(e.target.value);
    }

    let save = (e) => {
        e.preventDefault();
        let newUser = {user_name, full_name, born, email, status, role, password, avatar};
        addUser(newUser).then(value => {
            dispatch({type: ADD_USER, payload: value})
        });
    }

    return (
        <div>
            <form onSubmit={save}>
                <h3>Create new User</h3>
                <input type="text" name={'user_name'} value={user_name} onChange={addUserName} maxLength={20} placeholder={'user name'}/>
                <br/>
                <input type="text" name={'full_name'} value={full_name} onChange={addUserFullName} maxLength={20} placeholder={'full name'}/>
                <br/>
                <input type="text" name={'born'} value={born} onChange={addUserBorn} maxLength={20} placeholder={'dorn'}/>
                <br/>
                <select name="select" onInput={inputStatus} placeholder={'status'}>
                    <option name="value" value={status = "working"}>working</option>
                    <option name="value" value={status = "unemployed"}>unemployed</option>
                    <option name="value" value={status = "student"}>student</option>
                    <option name="value" value={status = "pensioner"}>pensioner</option>
                </select>
                <br/>
                <select name="select" onInput={inputRole} placeholder={'role'}>
                    <option name="value" value={role = "admin"}>admin</option>
                    <option name="value" value={role = "user"}>user</option>
                </select>
                <br/>
                <input type="text" name={'email'} value={email} onChange={addUserEmail} placeholder={'email'}/>
                <br/>
                <input type="text" name={'password'} value={password} onChange={addUserPassword} placeholder={'password'}/>
                <br/>
                <input type="text" name={'avatar'} value={avatar} onChange={addUserAvatar} placeholder={'avatar'}/>
                <br/>
                <button>Create User</button>
            </form>
        </div>
    );
}
