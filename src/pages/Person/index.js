import React from 'react';
import './index.css';
import { useHistory } from "react-router-dom";

function Person({character}) {
  const history = useHistory();

  // destructuring all details of character recieved as props from prev page.
  const {name ,birth_year, eye_color, skin_color, mass, height} = character
  
  return (
    <div className="person">
      <div className="card">
        {/* name of the character */}
        <h3>{name}</h3>   

        {/* table to show all details of character */}
        <table>
          <tr>
            <td>Birth Year:</td>
            <td>{birth_year}</td>
          </tr>
          <tr>
            <td>Eye Color:</td>
            <td>{eye_color}</td>
          </tr>
          <tr>
            <td>Skin Color:</td>
            <td>{skin_color}</td>
          </tr>
          <tr>
            <td>Weight:</td>
            <td>{mass}</td>
          </tr>
          <tr>
            <td>Height:</td>
            <td>{height}</td>
          </tr>
        </table>

        {/* button to go back to previous page */}
        <button onClick={()=>history.push("/")}>Go Back</button>
      </div>
    </div>
  );
}

export default Person;
 