const API_KEY='4e4a1a593bffd13dff59f81333374ba4'  // key
const makeiconurl=(iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;
const getformat =async( city,units='metric')=>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data=await fetch(URL)
    .then((res)=>res.json())
    .then((data)=> data);
    const {coord:{lon,lat},weather, main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
wind:{speed},
sys:{country,sunrise,sunset},
name,}=data;
const {description, icon}=weather[0];

return {
    description,
    iconURL:makeiconurl(icon),
    lon,lat,
    temp,feels_like,temp_min,temp_max,
    pressure,humidity,speed,country,sunrise,sunset,
    name
};

}
export {getformat};
