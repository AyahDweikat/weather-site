import React, { useState, useEffect } from "react";
import { getObjData } from "../../Utils/Utils";
import "./Main.scss";



function Main({ data }) {
  const [weathering, setWeathering] = useState({});
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [weatherState, setWeatherState] = useState({
    state: "",
    bgcolor: "#fff",
    image: "",
  });
  const [dFlag, setDFlag] = useState(false);
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setWeathering(data);
    }
  }, [data]);
  function kelvinToCel(num) {
    return Math.round(num - 273.15);
  }
  
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setDFlag(true);
    }
    setMinTemp(kelvinToCel(weathering?.main?.temp_min));
    setMaxTemp(kelvinToCel(weathering?.main?.temp_max));
    setHumidity(weathering?.main?.humidity);
    setPressure(weathering?.main?.pressure);

    let state = weathering?.weather?.map((item) => {
      return item.main.toLowerCase();
    });
    let weatherObj = getObjData(state);
    setWeatherState(weatherObj);
  }, [weathering]);

  return (
    
    <div
      className={`weatherCard`}
      style={{ backgroundColor: weatherState.color }}
    >
      {/* {console.log(weatherState)} */}
      {dFlag ? (
        <div className="content">
          <div className="state">
            <div>
              <img
                className="image"
                src={weatherState.image}
                alt={weatherState.state}
              />
            </div>
            <p className="state-title">{weatherState.state}</p>
          </div>
          <p className="temp-title">
            Temperaure{" "}
            <span className="temp-desc">
              {minTemp}&deg; to {maxTemp}&deg; C
            </span>
          </p>
          <p className="hum-pres">
            Humidity <span className="hum-pres-desc">{humidity}%{"   "}</span> Pressure{" "}
            <span className="hum-pres-desc">{pressure}</span>
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Main;
