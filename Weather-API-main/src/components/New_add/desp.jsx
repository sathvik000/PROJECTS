import React from "react";
import './desp.css'
//import {FaArrowDown} from 'react-icons/fa';
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
const Description=({weather,units})=>{
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'm/h';

  const car = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min.toFixed(),
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max.toFixed(),
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data: weather.feels_like.toFixed(),
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure,
      unit: "hPa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity,
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed.toFixed(),
      unit: windUnit,
    },
  ];
    return (
        <div className="section_desc">
          {car.map(({id,icon,title,data,unit})=>(
            <div key={id} className="card">
              <div className="description_card">
                  {icon}
                  <small>{title}</small>
              </div>
              <h2 className="exact_val">{`${data} ${unit}`}</h2>
            </div>


          ))}
        </div>
    );
};
export default Description;
