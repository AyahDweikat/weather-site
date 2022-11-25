function spliceString(str, index, count) {
  var array = str.split("");
  array.splice(index, count);
  return array.join("");
}
function getImages(w_State) {
  if (w_State === "clouds") {
    return `./img/weather-icons/cloudy.svg`;
  }
  let idx = w_State.indexOf(" ");
  if (idx >= 0) {
    let _state = spliceString(w_State, idx, 1);
    return `./img/weather-icons/${_state}.svg`;
  } else {
    return `./img/weather-icons/${w_State}.svg`;
  }
}

export function getObjData(state) {
  let image = getImages(`${state}`);
  let color = "#a6bcfa";
  let obj = { state, image, color };
  return obj;
}
