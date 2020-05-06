import React, {useState, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
    // an array is used in the useState becuase we are getting a list of ingridients
    const [userIngridients, setIngridients] = useState([]);


    // this acts like componentDidUpdate
    useEffect(() => {
     fetch('https://reacthooks-update-3c5bb.firebaseio.com/ingredients.json')
         .then(response => {
             return response.json()
         })
         .then(responseData =>{
             const loadedIngridient = [];
             for (const key in responseData){
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
   useEffect(()=>{
       console.log('RENDERED INGRIDIENT', userIngridients);
   }, [userIngridients]);

    const addIngridientHandler = ingridient => {
        fetch('https://reacthooks-update-3c5bb.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingridient),
            headers: {'Content-type': 'application/json'}
        })
            .then(response => {
                return response.json()
            })
            .then(responseData => {
                setIngridients(prevIngridients => [...prevIngridients, {id: responseData.name, ...ingridient}])
            })
        ;
    }

    // without using firebase
    // const addIngridientHandler = ingridient =>{
    //     setIngridients(prevIngridients => [...prevIngridients, {id: Math.random().toString(), ...ingridient}])
    //
    // }


    const removeIngridientHandler = (ingridientId) => {
        setIngridients(prevIngridients =>
            prevIngridients.filter(ingridient => ingridient.id !== ingridientId.id))
        console.log('item deleted');
    }


    const filteredIngridient = useCallback(filteredIngrideint => {
        setIngridients(filteredIngrideint);

    }, [setIngridients]);

    return (
        <div className="App">
            <IngredientForm onAddIngridient={addIngridientHandler}/>

            <section>
                <Search onloadIngridient={filteredIngridient}/>
                <IngredientList ingredients={userIngridients} onRemoveItem={removeIngridientHandler}/>
            </section>
        </div>
    );
}

export default Ingredients;
