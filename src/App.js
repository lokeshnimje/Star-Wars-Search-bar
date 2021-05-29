import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Person from "./pages/Person";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = React.useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [person,setPerson] = useState({})

  React.useEffect(() => {
    if (query == "") {
      setSuggestions([]);
    } else {
      getData(query);
      let out = suggestions
        .filter((item) =>
          item.name.toLowerCase().indexOf(query) !== 0 ? true : false
        )
        .map((item) => item.name);
      setSuggestions(out);
      // console.log(out);
    }
  }, [query]);

  const getData = (val) => {
    setLoading(true);
    axios
      .get(`https://swapi.dev/api/people/?search=${val}`)
      .then((res) => {
        setSuggestions(res.data.results);
        console.log(res.data.results)
      })
      .catch((err) => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage
              loading={loading}
              setLoading={setLoading}
              value={query}
              onChange={(val) => setQuery(val)}
              suggestions={suggestions}
              setPerson={setPerson}
            />
          </Route>

          <Route path="/person/:id">
            <Person 
             person={person}
            />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
