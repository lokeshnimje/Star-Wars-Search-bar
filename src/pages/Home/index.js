import React, { useEffect, useRef, useState } from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import styled from "styled-components";
import { useThrottle } from "use-throttle";
import { Redirect, useHistory } from "react-router-dom";
import {FaSearch} from "react-icons/fa";

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
const RightSide = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding-right: 10px;
  color: grey;
  cursor: pointer;
`;
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

function HomePage({ loading, setLoading, suggestions, value, onChange,setPerson }) {
  const history = useHistory();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  // const [person, setPerson] = useState({});
  const scrollRef = useRef();
  const ThrottleText = useThrottle(q, 1000);
  useEffect(() => {
    onChange(ThrottleText);
  }, [ThrottleText, onChange]);

  const handleInputChange = (e) => {
    setQ(e.target.value);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const handleClear = () => {
    setQ("");
    onChange("");
    setLoading(false);
  };

  const handleChangeActiveSuggestion = (e) => {
    console.log(e.keyCode, active);
    console.log(e.target.scrollHeight);

    switch (e.keyCode) {
      case 40: {
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
      case 38: {
        if (active == 1) {
          setActive(0);
        } else if (active <= 0) {
          setActive(suggestions.length);
        } else {
          setActive((prev) => prev - 1);
        }

        break;
      }
      case 13: {
        setPerson(suggestions[active-1])
        sendData(suggestions[active - 1].name)
        
        // break;
      }
      default: {
        return;
      }
    }
  };
  
  const sendData = (name) => {
    history.push(`/person/${name}`);
  };
  const handleClick = () => {
    setPerson(suggestions[active-1])
    sendData(suggestions[active - 1].name)
  }

  return (
    <>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      <SearchbarWrapper q={q} onKeyUp={handleChangeActiveSuggestion}>
        <Input value={q} onChange={handleInputChange} />
        <RightSide>
          { <span >{!q ?<FaSearch  className="inputicons"/>:
        <span onClick={(e)=>handleClear(e)}>X</span>}</span>}
          {loading && <Spinner />}
        </RightSide>
      </SearchbarWrapper>
      {!loading && (
        <SuggestionBox
          ref={scrollRef}
          limit={5}
          len={suggestions.length}
          active={active}
        >
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
