import React from 'react';
import './index.css';
import { Redirect, useHistory } from "react-router-dom";

function Person({person}) {
  const history = useHistory();
  const {name ,birth_year, eye_color, skin_color, mass, height} = person
  return (
    <div className="person">
      <div className="text">
        <h3>{name}</h3>
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
        <button onClick={()=>history.push("/")}>Go Back</button>
      </div>
    </div>
  );
}

export default Person;
// 