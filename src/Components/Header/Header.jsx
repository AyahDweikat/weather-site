import axios from "axios";
import React, { useState } from "react";
import "./Header.scss";

function Header({setData}) {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState({}); // store data from api

  function getLocation(e) {
    setLocation(e.target.value);
  }
  function capitalize(word) {
    let lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }
  const getData = async (location) => {
    let _location = capitalize(location);
    const resp = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${_location}&appid=7978bd37eb6b8463cc06ca35e9166f7a`
    );
    if (resp.status === 200) {
      let data = resp.data;
      setWeatherData(data);
      if(typeof setData=="function"){
        setData(data);
      }
    } else {
      console.log("sorry, this API failed");
      //// @TODO: we will handle it later// to work later
    }
  };
  function displayData(e) {
    e.preventDefault();
    getData(location);
  }
  return (
    <>
      <div className="header w-100">
        <div className="container-fluid">
          <div className="" id="">
            <form className="d-flex" role="search" onSubmit={displayData}>
              <input
                className=" me-2 searchInpt"
                onChange={getLocation}
                type="search"
                placeholder="Type in a city name"
                aria-label="Search"
              />
              <button className="searchBtn" type="submit">
                FIND WEATHER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
