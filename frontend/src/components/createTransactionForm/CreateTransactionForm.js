import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../../services/transactionServise";
import { ADD_TRANSACTION } from "../../redux/actions/actions";

export default function CreateTransactionForm () {

    let state = useSelector(state => state);
    let dispatch = useDispatch();

    let [sum, setSum] = useState('');
    let [status, setStatus] = useState('');
    let [kind, setKind] = useState('');

    let addSum = (e) => {
        setSum(e.target.value);
    }
    let inputStatus = (e) => {
        setStatus(e.target.value);
    }
    let inputKind = (e) => {
        setKind(e.target.value);
    }

    let createTransaction = (e) => {
        e.preventDefault();
        let tempTransaction = {sum, status, kind};
        addTransaction(tempTransaction).then(value => {
            dispatch({type: ADD_TRANSACTION, payload: value});
        })
    }
    return (
        <div>
            <form className="form_create_transaction" onSubmit={createTransaction}>
                <h3>Please fill in this form to create your transaction.</h3>
                <input type="text" name={'sum'} value={sum} onChange={addSum}
                       placeholder={'sum'}/>
                <br/>
                <select name="select" onInput={inputStatus} placeholder={'status'}>
                    <option name="value" value={status = "working"}>working</option>
                    <option name="value" value={status = "unemployed"}>unemployed</option>
                    <option name="value" value={status = "student"}>student</option>
                    <option name="value" value={status = "pensioner"}>pensioner</option>
                </select>
                <br/>
                <select name="select" onInput={inputKind} placeholder={'kind'}>
                    <option name="value" value={kind = "machinery"}>machinery</option>
                    <option name="value" value={kind = "food"}>food</option>
                    <option name="value" value={kind = "clothes"}>clothes</option>
                    <option name="value" value={kind = "medicine"}>medicine</option>
                    <option name="value" value={kind = "services"}>services</option>
                    <option name="value" value={kind = "moving"}>moving</option>
                    <option name="value" value={kind = "children circles"}>children circles</option>
                    <option name="value" value={kind = "teaching"}>teaching</option>
                </select>
                <br/>
                <button>Create Transaction</button>
            </form>
        </div>
    );
}
