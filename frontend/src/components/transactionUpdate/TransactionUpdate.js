import { useState } from "react";
import {updateTransaction} from "../../services/transactionServise";

export default function TransactionUpdate (props) {

    let { match: { params : {id}}, history } = props;

    let [sum, setSum] = useState('');
    let [category, setCategory] = useState('');
    let [kind, setKind] = useState('');
    let [error_message, setErrorMessage] = useState('');

    let addSum = (e) => {
        setSum(e.target.value);
    }
    let inputCategory = (e) => {
        setCategory(e.target.value);
    }
    let inputKind = (e) => {
        setKind(e.target.value);
    }

    let updateTr = async (e) => {
        e.preventDefault();

        let updateData = {sum, category, kind};

        const response = await updateTransaction(updateData, id);

        if (response.data.status !== 200){
            setErrorMessage(response.data.msg);
        } else {
            history.push('/transactions');
        }

    }

    return (
        <div>
            <p className="error_message">{error_message}</p>
            <h3>transaction update</h3>
            <form className="form_update_transaction" onSubmit={updateTr}>
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
                <button>update</button>
            </form>
        </div>
    );
}
