import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Person from "./pages/Person";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import axios from "axios";
import "./App.css";
import { useHistory } from "react-router-dom";

function App() {
  // Creating and initializing all States for components 
  const [query, setQuery] = useState("");     
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = React.useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [character,setCharacter] = useState({})

  const history = useHistory();

// rendering component as per query in search box
  React.useEffect(() => {
    if (query == "") {      // if the query in the search bar is empty then no suggestion is shown.
      setSuggestions([]);
    } else {
      getData(query);     // if the query is present then fetch data as per given query.
      let searchResult = suggestions
        .filter((item) =>
          item.name.toLowerCase().indexOf(query) !== 0 ? true : false
        )
        .map((item) => item.name);
      setSuggestions(searchResult);
    }
  }, [query]);      // Query as dependency

   // fetching data from API as the input given from the search bar.
  const getData = (query) => {   
    setIsLoading(true);
    axios
      .get(`https://swapi.dev/api/people/?search=${query}`)
      .then((res) => {
        setSuggestions(res.data.results);    
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // if(isError){
  //   history.push("/error")
  // }

  return (
    <div className="app">
      <Router>    
        <Switch>
          <Route path="/" exact>    
          {/* Homepage as default page */}
            <HomePage
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              value={query}
              onChange={(val) => setQuery(val)}
              suggestions={suggestions}
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
