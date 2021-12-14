import {useState} from "react";
import {forgotPassword} from "../../services/authService";

export default function ForgotPassword () {

    let [email, setEmail] = useState('');

    let addEmail = (e) => {
        setEmail(e.target.value);
    }

    let sendToMail = (e) => {
        e.preventDefault();
        forgotPassword({email});
    }

    return (
        <div>
            <form onSubmit={sendToMail}>
                <h3>Please, input your email</h3>
                <input type="text" name={'email'} value={email} onChange={addEmail} placeholder={'email'}/>
                <button>Enter</button>
            </form>
        </div>
    );
}
