import React, {useState} from 'react';
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  // note that use state can take in objects, arrays and so on unlike component class
  // const [inputState, setInputState] = useState({title: "", amount: ""});

  // for the sake of mutiple objects, we set and update state like this
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    props.onAddIngridient({title:enteredTitle, amount:enteredAmount});
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
                   onChange={event => {
                       const newTitle = event.target.value;
                       setEnteredTitle(newTitle)
                     }}
                   value={enteredTitle} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={enteredAmount}
                   onChange={event => {
                       const newAmount = event.target.value;
                       setEnteredAmount(newAmount)
                   }}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">
                Add Ingredient
            </button>
              {props.loading ? <LoadingIndicator/> : null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
