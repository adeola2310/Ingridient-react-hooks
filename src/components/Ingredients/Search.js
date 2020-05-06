import React, {useEffect, useState, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';


const Search = React.memo(props => {

    const { onloadIngridient } = props;
    const [enteredFilter, setFilter] = useState('');
    const inputRef = useRef();


    useEffect(()=>{

       const timer = setTimeout(()=>{
            if (enteredFilter === inputRef.current.value){
                // a search query from firebase
                const query = enteredFilter === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                fetch('https://reacthooks-update-3c5bb.firebaseio.com/ingredients.json' + query)
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
                        // props.onloadIngridient(loadedIngridient);

                        onloadIngridient(loadedIngridient);
                    });
            }

        },500);
       return ()=>{
           clearTimeout(timer);
       }

    }, [enteredFilter, onloadIngridient, inputRef]);

    return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
                 ref={inputRef}
          value={enteredFilter}
          onChange={e =>{setFilter(e.target.value)}}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
