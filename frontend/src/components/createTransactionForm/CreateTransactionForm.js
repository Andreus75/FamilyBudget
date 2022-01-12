import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../services/transactionServise";
import {ADD_TRANSACTION, GET_USERS} from "../../redux/actions/actions";
import {getUsers} from "../../services/userServices";

export default function CreateTransactionForm (props) {

    const { history } = props;

    let dispatch = useDispatch();

    let [sum, setSum] = useState('');
    let [category, setCategory] = useState('');
    let [kind, setKind] = useState('');

    useEffect(() => {
        getUsers().then(value => {
            dispatch({type: GET_USERS, payload: value});
        });
    },[dispatch]);

    let addSum = (e) => {
        setSum(e.target.value);
    }
    let inputCategory = (e) => {
        setCategory(e.target.value);
    }
    let inputKind = (e) => {
        setKind(e.target.value);
    }

    let createTransaction = async (e) => {
        e.preventDefault();

        let tempTransaction = {sum, category, kind};

        await addTransaction(tempTransaction);
        history.push('/transactions');
    }
    return (
        <div>
            <form className="form_create_transaction" onSubmit={createTransaction}>
                <h3>Please fill in this form to create your transaction.</h3>
                <br/>
                <input type="text" name={'sum'} value={sum} onChange={addSum}
                       placeholder={'sum'}/>
                <br/>
                <select name="select" onInput={inputCategory} placeholder={'category'}>
                    <option name="value" value={"profit"}>profit</option>
                    <option name="value" value={"household"}>household</option>
                    <option name="value" value={"leisure"}>leisure</option>
                    <option name="value" value={"travel"}>travel</option>
                    <option name="value" value={"products"}>products</option>
                    <option name="value" value={"pocket"}>pocket</option>
                    <option name="value" value={"unpredictable"}>unpredictable</option>
                    <option name="value" value={"health"}>health</option>
                </select>
                <br/>
                <select name="select" onInput={inputKind} placeholder={'kind'}>
                    <option name="value" value={"machinery"}>machinery</option>
                    <option name="value" value={"food"}>food</option>
                    <option name="value" value={"clothes"}>clothes</option>
                    <option name="value" value={"medicine"}>medicine</option>
                    <option name="value" value={"services"}>services</option>
                    <option name="value" value={"moving"}>moving</option>
                    <option name="value" value={"children circles"}>children circles</option>
                    <option name="value" value={"teaching"}>teaching</option>
                </select>
                <br/>
                <button>Create Transaction</button>
            </form>
        </div>
    );
}
