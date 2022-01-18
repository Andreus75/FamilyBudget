import {Route, Switch} from "react-router-dom";
import FilterForm from "../filterForm/FilterForm";
import FunctionForRegistrationFamily from "../functions ForRegistrationUser/FunctionForRegistrationFamily";
import TransactionsFilter from "../transactions/TransactionsFilter";
import Rules from "../Rules";
import RegistrationForm from "../registrationForm/RegistrationForm";
import CreateFamily from "../createFamily/CreateFamily";
import CreateUserForm from "../createUserForm/CreateUserForm";
import CreateTransactionForm from "../createTransactionForm/CreateTransactionForm";
import ActivatedFamily from "../activatedForm/ActivatedFamily";
import Transactions from "../transactions/Transactions";
import TransactionUpdate from "../transactionUpdate/TransactionUpdate";

export default function Main() {

    return (
        <div className={'main'}>
            <div className="filter_section">
                <Switch>
                    <Route path={'/transactions/filter'} component={FilterForm}/>
                    <Route path={'/transactions'} component={FilterForm}/>
                </Switch>
            </div>
            <div className={'main_info'}>
                <Switch>
                    <Route path={'/functionForRegistrationFamily'} component={FunctionForRegistrationFamily}/>
                    <Route path={'/transactions/filter'} component={TransactionsFilter}/>
                    <Route path={'/transaction/update/:id'} component={TransactionUpdate}/>
                    <Route path={'/transactions'} component={Transactions}/>

                    <Route path={'/activation'} component={ActivatedFamily}/>
                    <Route path={'/rules'} component={Rules}/>

                    <Route path={'/registration'} component={RegistrationForm}/>
                    <Route path={'/createFamily'} component={CreateFamily}/>
                    <Route path={'/createUser'} component={CreateUserForm}/>
                    <Route path={'/createTransaction'} component={CreateTransactionForm}/>
                </Switch>
            </div>

        </div>
    );
}
