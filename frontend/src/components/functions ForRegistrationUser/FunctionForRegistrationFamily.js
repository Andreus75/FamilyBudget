import './FunctionRegistrationFamily.css';
import {Link, Route} from "react-router-dom";
import FilterForm from "../filterForm/FilterForm";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import CreateNewPassword from "../forgotPassword/CreateNewPassword";
import Transactions from "../transactions/Transactions";

export default function FunctionForRegistrationFamily (props) {
    console.log(props);
    return (
        <div>
            <div className="function_registration_user">
                <div className="filter_section">
                    <Link to={'/transactions/filters'}><h4>Filters transactions</h4></Link>
                    <Route path={'/transactions/filters'} component={FilterForm}/>
                </div>
                <div>
                    <Transactions/>
                    {/*<Link to={'/transactions'}>Hi, please click</Link>*/}
                    <Route path={'/transactions/filters'} component={Transactions}/>

                </div>
            </div>
        </div>
    );
}
