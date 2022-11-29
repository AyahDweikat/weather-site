import React, { useState, useEffect } from "react";
import { getData, getImage } from "../../Utils/Utils";
import "./Main.scss";

function Main({ data }) {
  // const date =new Date().toLocaleDateString();
  // const time = new Date().toLocaleTimeString();
  const [weathering, setWeathering] = useState({});
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [weatherState, setWeatherState] = useState("");
  const [imageState, setImageState] = useState("");
  const [dFlag, setDFlag] = useState(false);
  const [allDayWeather, setAllDayWeather] = useState([
    {
      state: "",
      image: "",
      temp: "",
      state:""
    },
  ]);
  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setWeathering(data.list);
    }
  }, [data]);
  useEffect(() => {
    if (Object.keys(weathering).length !== 0) {
      setDFlag(true);
      getPresentData(weathering);
      getAllDayData(weathering);
    }
  }, [weathering]);
  function getPresentData(weathering) {
    let moment = weathering?.find((item) => {
      return item;
    });
    let wData = getData(moment);
    setMinTemp(wData.min_temp);
    setMaxTemp(wData.max_temp);
    setHumidity(wData.humidity);
    setPressure(wData.pressure);
    setWeatherState(wData.state);
    setImageState(wData.image);
  }
  function getAllDayData(weathering) {
    let _weathering = [...weathering];
    let _allDay = _weathering.map((item) => {
      return {
        time: item.dt_txt.slice(11, 13),
        image: getImage(item.weather.find((item) => item).id),
        temp: Math.round(item.main.temp),
      };
    });
    let allDay = _allDay.slice(0, 7);
    console.log(allDay);
    setAllDayWeather(allDay);
  }

  return (
    <div className={`weatherCard`}>
      {dFlag ? (
        <div>
          <div className="content">
            <div className="state">
              <div>
                <img className="image" src={imageState} alt={weatherState} />
              </div>
              <p className="state-title">{weatherState}</p>
            </div>
            <p className="temp-title">
              Temperaure{" "}
              <span className="temp-desc">
                {minTemp}&deg; to {maxTemp}&deg; C
              </span>
            </p>
            <p className="hum-pres">
              Humidity{" "}
              <span className="hum-pres-desc">
                {humidity}%{"   "}
              </span>{" "}
              Pressure <span className="hum-pres-desc">{pressure}</span>
            </p>
          </div>
          <div className="allDayData">
            {allDayWeather.map((item) => {
              return (
                <div className="state-time">
                  <div>
                  <p className="time">{`${item.time}:00`}</p>
                  <img
                      className="state-time-image"
                      src={item.image}
                      alt={"state"}
                    />
                  </div>
                  <p className="temp">{item.temp}&deg; C</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Main;
