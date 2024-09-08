import './App.css';
//import Description from './components/New_add/desp.jsx';
import cold from './components/images1/snow1.jpg';
import hot from './components/images1/hot_summer.jpg';
import rainy from './components/images1/rainy.jpg'
import Description from './components/New_add/desp';
import { useState,useEffect } from 'react';
//import Today from './components/New_add/time';
import { getformat } from './components/New_add/weather_service';
//import { MdOpacity } from 'react-icons/md';

function App() {
    const [bkgd,setBg]=useState(hot);
	const [city,setCity]=useState('paris');
	const [weather,setweather]=useState(null);
	const [units ,setUnits]=useState("metric");
	//const [longitude,setlon]=useState(null);
	const [dateState, setDateState] = useState(new Date());
    /*useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);*/


	useEffect(() => {
		setInterval(() => setDateState(new Date()), 30000);
		const fetchdata= async()=>{
			const data=await getformat(city,units);
			setweather(data);

			const c = units ==="metric" ? 20 : 60;
			//console.log(data.temp);
			const f =data.description.includes("cloud");
			const g =data.description.includes("rain");
			if((data.temp<=c&&!f)&&(data.temp<=c&&!g)){
				setBg(cold);

			} 

			else if((data.temp>20&&!f)&&(data.temp>20&&!g)){
				setBg(hot);
			}
			else if(f||g){
				setBg(rainy);
			}

		};
		
		fetchdata();
	}, [units,city]);

	/*const time=(e)=>{
		console.log(e);
		let f=new Date(e*1000);
		//setlon(f);
		//console.log(f)
		setlon(f);
		
	}*/

	const handleInput =(e) =>{
		const but=e.currentTarget;
		const currentunit=but.innerText.slice(1);
		const isCelsius=currentunit==='C';

		but.innerText=isCelsius? '°F': '°C';
		setUnits(isCelsius? 'metric':'imperial');


	};
	const textEntered = (e) => {
		if(e.keyCode === 13){
			setCity(e.currentTarget.value);
			e.currentTarget.blur();
			


			/*console.group(city);*/
		}
	};
	

	const sty={
		backgroundImage: `url(${bkgd})`,
		//backgroundColor:'#22e5e5',
		//backgroundColor:'background-red',
		backgroundSize:'cover',
		backgroundRepeat:'no-repeat',
		backgroundPosition:'center',
		
		

	};
	

  return (
   <div className='App' >
	    <div className="king" style={sty}>
			<h1 className='heading'>Weather ForeCast</h1>
	    	<div className="overlay">
				{	
				weather && (
					<div className="container">
					<div className="section_inputs">
						<div className='sec_in1'>
						    <input onKeyDown={textEntered}type="text" name="city" autocomplete ="off" onfocus="this.value=''" placeholder='Enter City...'/>
						</div>
						<div className='sec_in2'>
						    <button onClick={(e)=>handleInput(e)}>°F</button>
						</div>
						
						<div className="current_date">
                           
                            <p>
                             
                              {dateState.toLocaleDateString('en-GB', {
                                 day: 'numeric',
                                 month: 'short',
                                 year: 'numeric',
                              })}
                            </p>
                            
                            <p>
                             {dateState.toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                            </p>
                        </div>
					</div>
					<div className='info'>
					    <div className='coordinate'>
					    	<h2>Current Location of {`${weather.name}`}</h2>
					    	<div className='c1'>
					    	    <h3 className='coord1'>Longitude :{`${weather.lon}`}</h3>
					    	</div>
					    	<div className='c2'>
					    	    <h3 className='coord2'>Latitute:{`${weather.lat}`}</h3>
					    	</div>
					    </div>
					    <hr />
					    <div className='timestamp'>
					    	
					    	<h2>Sunrise time : {`${new Date(`${weather.sunrise}`*1000)}`.slice(15)}</h2> 
					    	<h2>Sunset time :{`${new Date(`${weather.sunset}`*1000)}`.slice(15)}</h2>
    
					    </div>
					</div>
					
					<div className="section_temp">
						<div className="icon">
						    	
						    <h3 className='icon1'>{`${weather.name},${weather.country}`}</h3>
						    <img src={weather.iconURL}
							
							alt="weater icon"></img>
						    <h3 className='icon3'>{weather.description}</h3>
						</div>
						
					    <div className="temp">
					    	<h1>{`${weather.temp.toFixed()} °${units ==="metric"?"C":"F"}`}</h1>
					    </div>

					</div>
					<Description weather={weather} units={units}/>

				</div>

					)

				}
				
			</div>
		</div>
	   
	</div>
		

  );
}

export default App;

