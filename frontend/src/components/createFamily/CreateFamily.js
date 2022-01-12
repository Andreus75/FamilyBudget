import {useState} from "react";
import {addFamily} from "../../services/familyService";

export default function CreateFamily (props) {
    let {history} = props;

    let [family_name, setFamilyName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [avatar, setAvatar] = useState('');
    let [error, setError] = useState('');

    let addFamilyName = (e) => {
        setFamilyName(e.target.value);
    }
    let addFamilyEmail = (e) => {
        setEmail(e.target.value);
    }
    let addFamilyPassword = (e) => {
        setPassword(e.target.value);
    }
    let addFamilyAvatar = (e) => {
        setAvatar(e.target.value);
    }

    let save = async (e) => {
        e.preventDefault();
        let newFamily = {family_name, email, password, avatar};

        const promise = await addFamily(newFamily);
        // setError(family_name + 'family' + promise.statusText)

        history.push('/activation');
    }


    return (
        <div>
            <div>
                {error}
            </div>
            <form onSubmit={save}>
                <h3>Create new Family</h3>

                <input type="text" name={'family_name'} value={family_name} onChange={addFamilyName} maxLength={20} placeholder={'family name'}/>
                <br/>
                <input type="text" name={'email'} value={email} onChange={addFamilyEmail} placeholder={'email'}/>
                <br/>
                <input type="text" name={'password'} value={password} onChange={addFamilyPassword} placeholder={'password'}/>
                <br/>
                <input type="file" name={'avatar'} value={avatar} onChange={addFamilyAvatar} placeholder={'avatar'}/>
                <br/>
                <button>Create family</button>
            </form>

        </div>
    );
}
