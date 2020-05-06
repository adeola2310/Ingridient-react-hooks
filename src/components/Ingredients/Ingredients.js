import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";

const Ingredients = () => {
    // an array is used in the useState becuase we are getting a list of ingridients
    const [userIngridients, setIngridients] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState();


    // this acts like componentDidUpdate
    useEffect(() => {
        fetch('https://reacthooks-update-3c5bb.firebaseio.com/ingredients.json')
            .then(response => {
                return response.json()
            })
            .then(responseData => {
                const loadedIngridient = [];
                for (const key in responseData) {
                    loadedIngridient.push({
                            id: key,
                            title: responseData[key].title,
                            amount: responseData[key].amount
                        }
                    )
                }
                setIngridients(loadedIngridient);
            });
    }, []);

    // with the [] here, useEffect acts like componentDidMount
    useEffect(() => {
        console.log('RENDERED INGRIDIENT', userIngridients);
    }, [userIngridients]);

    const addIngridientHandler = ingridient => {
        setisLoading(true);
        fetch('https://reacthooks-update-3c5bb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingridient),
            headers: {'Content-type': 'application/json'}
        })
            .then(response => {
                setisLoading(false);
                return response.json()
            })
            .then(responseData => {
                setIngridients(prevIngridients => [...prevIngridients, {id: responseData.name, ...ingridient}])
            })
            .catch(error=>{
                setError('');
            })
    }

    // without using firebase
    // const addIngridientHandler = ingridient =>{
    //     setIngridients(prevIngridients => [...prevIngridients, {id: Math.random().toString(), ...ingridient}])
    //
    // }


    const removeIngridientHandler = (ingridientId) => {
        fetch(`https://reacthooks-update-3c5bb.firebaseio.com/ingredients.json/${ingridientId}`, {method: 'DELETE'})
            .then(response => {
                setIngridients(prevIngridients =>
                    prevIngridients.filter(ingridient => ingridient.id !== ingridientId.id))
            })
            .catch(error=>{
                setError('');
            })
        console.log('item deleted');
    }


    const filteredIngridient = useCallback(filteredIngrideint => {
        setIngridients(filteredIngrideint);

    }, [setIngridients]);


    const closeErrorModal = ()=>{
   setError(null);
   setisLoading(false);
    }

    return (
        <div className="App">
            {error ? <ErrorModal onClose={closeErrorModal}/> : null }
            <IngredientForm
                onAddIngridient={addIngridientHandler}
                loading={isLoading}/>

            <section>
                <Search onloadIngridient={filteredIngridient}/>
                <IngredientList ingredients={userIngridients} onRemoveItem={removeIngridientHandler}/>
            </section>
        </div>
    );
}

export default Ingredients;
