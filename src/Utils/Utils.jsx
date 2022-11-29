function getState(id) {
    if(id<300){return 'storm';} 
    else if(id>=300 && id<500){ return `drizzle`;}
    else if(id>=500 && id<600){ return `rain`;}
    else if(id>=600 && id<700){ return `snow`;}
    else if(id>=700 && id<800){ return `fog`;}
    else if(id===800){ return `clear`;}
    else if(id===801){ return `partlycloudy`;}
    else if(id>801 || id<=805){ return `mostlycloudy`;}
}

export function getImage(id){
  let state = getState(id);
  return `./img/weather-icons/${state}.svg`;
}
export function getData(moment){
  let min_temp = Math.round(moment?.main?.temp_min);
  let max_temp = Math.round(moment?.main?.temp_max);
  let humidity= moment?.main?.humidity;
  let pressure= moment?.main?.pressure;
  let {id} = moment?.weather?.find((item) => {
    return item.id;
  });
  let state = getState(id);
  let image = `./img/weather-icons/${state}.svg`;
  let obj = { min_temp, max_temp, humidity, pressure, state, image };
  return obj;
}