import React, { useEffect, useRef, useState } from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import styled from "styled-components";
import { useThrottle } from "use-throttle";
import { useHistory } from "react-router-dom";
import {FaSearch} from "react-icons/fa";

//created styled component to provide styles to page.

// style for search bar wrapper which include input field along with icons.
const SearchbarWrapper = styled.div`
  border: 1px solid black;
  border-radius: 25px;
  padding: 16px 15px;
  display: flex;
  height: 25px;
  width: 480px;
  background: #2d2f30;
  color:#f2f2f2;
  margin:auto;
  margin-top: 230px;
  
`;

// style for input field
const Input = styled.input`
  width: 400px;
  padding: 16px 24px;
  border-radius: 25px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background: #2d2f30;
  color: #f2f2f2;
`;

// style for search bar icons provided in right corner of search bar.
const searchBarIcons = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding-right: 10px;
  color: grey;
  cursor: pointer;
`;

// style for spinner for loading.
const Spinner = styled.div`
  border: 3px solid yellow;
  border-top: 3px solid #2D2F30; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-left: 10px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// style for suggestion box provided below search bar.
const SuggestionBox = styled.div`
  display: ${({ len }) => (len !== 0 ? "flex" : "none")};
  flex-direction: column;
  width:480px;
  max-height: 200px;
  padding: 16px 10px;
  overflow: hidden;
  color: #f2f2f2;
  margin:0 auto;
  background-color: #2D2F30;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border: 1px solid black;
  & * {
    /* border:1px solid black;
      border-top-color:transparent; */
    flex: 1;
    padding: 5px;
    text-align: left;
  }
  & :nth-child(${({ active }) => active}) {
    background: grey;
    color: white;
  }
`;

function HomePage({ loading, setIsLoading, suggestions, onChange,setCharacter }) {
// Creating and initializing all States for components 
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();
  const ThrottleText = useThrottle(query, 1000);

  // re-render component as per throttle
  useEffect(() => {
    onChange(ThrottleText);
  }, [ThrottleText, onChange]);

  // handle input given in search bar.
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsLoading(true);
    setTimeout(() => {    // loading indicator shown for 1 second.
      setIsLoading(false);
    }, 1000);
  };

  // clear the search bar when clicking on clear icon.
  const handleClear = () => {
    setQuery("");
    onChange("");
    setIsLoading(false);
  };

  // push to the next page with character's name added in url.
  const sendData = (name) => {
    history.push(`/person/${name}`);
  };

  // clicking to character's name from suggestion will take to next page.
  const handleClick = () => {
    setCharacter(suggestions[active-1])
    sendData(suggestions[active - 1].name)
  }


  // Move up and down using up key or down key in suggestion 
  // and select character by pressing enter.
  const handleChangeActiveSuggestion = (e) => {
  
    switch (e.keyCode) {
      case 40: {    // handling key down
        if (active >= suggestions.length) {
          setActive(0);
        } else {
          setActive((prev) => prev + 1);
        }
        if (active > 4) {
          scrollRef.current.scrollTop += 20;
        }
        break;
      }
      case 38: {  // handling key up
        if (active == 1) {
          setActive(0);
        } else if (active <= 0) {
          setActive(suggestions.length);
        } else {
          setActive((prev) => prev - 1);
        }

        break;
      }
      case 13: {    // handling enter button
        setCharacter(suggestions[active-1])   // set character to selected name
        sendData(suggestions[active - 1].name)  // send selected character's name to switch to next page
        break
      }
      default: {
        return;
      }
    }
  };
  

  return (
    <>
      {/* star war logo */}
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>

      {/* search bar with input field and all icons  */}
      <SearchbarWrapper query={query} onKeyUp={handleChangeActiveSuggestion}>
        <Input value={query} onChange={handleInputChange} />
        <searchBarIcons>
          { <span >{!query ?<FaSearch  className="inputicons"/>:
           <span onClick={(e)=>handleClear(e)}>X</span>}</span>}
           {/* if Loading is true then spin */}
          {loading && <Spinner />}  
        </searchBarIcons>
      </SearchbarWrapper>

      {/* if loading is over then show suggestion box */}
      {!loading && (
        <SuggestionBox ref={scrollRef} limit={5}  len={suggestions.length} active={active}>
          {suggestions.map((item, index) => (
            <div onClick={handleClick} style={{fontSize:"20px"}} key={item.name} onMouseOver={() => setActive(index + 1)}>
               {item.name}
            </div>
          ))}
        </SuggestionBox>
      )}
    </>
  );
}

export default HomePage;
