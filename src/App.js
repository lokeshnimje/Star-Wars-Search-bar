import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Person from "./pages/Person";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import axios from "axios";
import "./App.css";
import useDebouncer from "./Components/Hooks/useDebounce";


function App() {
  // Creating and initializing all States for components 
  const [query, setQuery] = useState("");     
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = React.useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [character,setCharacter] = useState({})

  const debouncerValue = useDebouncer(query) 


// rendering component as per query in search box
  React.useEffect(() => {
    if (debouncerValue == "") {      // if the query in the search bar is empty then no suggestion is shown.
      setSuggestions([]);
      setIsLoading(false)
    } else {
      getData(debouncerValue);     // if the query is present then fetch data as per given query.
      let searchResult = suggestions
        .filter((item) =>
          item.name.toLowerCase().indexOf(debouncerValue) !== 0 ? true : false
        )
        .map((item) => item.name);
      setSuggestions(searchResult);
    }
  }, [debouncerValue]);      // debouncer value as dependency

   // fetching data from API as the input given from the search bar.
  const getData = (query) => {   
    setIsLoading(true);
    axios
      .get(`https://swapi.dev/api/people/?search=${query}`)
      .then((res) => {
        console.log(res)
        setSuggestions(res.data.results);    
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="app">
      <Router>    
        <Switch>
          <Route path="/" exact>    
          {/* Homepage as default page */}
            <HomePage
              isLoading={isLoading}
              setIsLoading={(value)=>setIsLoading(value)}
              query={query}
              setQuery={(value) => setQuery(value)}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              setCharacter={setCharacter}
              isError={isError}
            />
          </Route>
          <Route path="/person/:id">
            {/* Route to Person page whit character's detail as props */}
            <Person 
             character={character}
            />
          </Route>
          <Route path="/error" exact>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
