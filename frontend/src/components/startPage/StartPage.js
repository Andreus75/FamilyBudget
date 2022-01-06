import {Link, Route} from "react-router-dom";
import RegistrationForm from "../registrationForm/RegistrationForm";
import CreateUserForm from "../createUserForm/CreateUserForm";
import CreateNewPassword from "../forgotPassword/CreateNewPassword";
import ForgotPassword from "../forgotPassword/ForgotPassword";

export default function StartPage () {
    return (
        <div>
                <div className={'button_nav'}>
                    <Link to={'/createUser'}>
                        <button className="button_create_user">Create User</button>
                    </Link>
                    <Link to={'/registration'}>
                        <button className="button_registration">Registration</button>
                    </Link>
                    <div className={'button_nav'}>
                        <Link to={'/createTransaction'}><button className="button_create_transaction" disabled={true}>Create Transaction</button></Link>
                        <Link to={'/transactions'}><button className="button_transactions" disabled={true}>Transactions</button></Link>
                    </div>
                </div>
                <main className="main_info">
                    {/*<Route path={'/registration'} component={RegistrationForm}/>*/}
                    {/*<Route path={'/createUser'} component={CreateUserForm}/>*/}

                    <Route path={'/auth/password/forgot/new'} component={CreateNewPassword}/>
                    <Route path={'/auth/password/forgot'} component={ForgotPassword}/>
                </main>
        </div>
    );
}
