// import hourlyData from './hourlyData.json';
// import overviewData from './overviewData.json';
// import locationData from './locationData.json';
import React, { useState } from "react"
import { getLocation } from "./WeatherService"
import "./Weather.css"
import { getHourly } from "./WeatherService"
import { render } from "@testing-library/react"
import styled from 'styled-components';

const AllCards = styled.div`
padding: 160px;

    `
const HourlyCard = styled.div`
float:left;
border: 2px solid black;
background:#E8E8E8;
width:25%;
height:480px;
margin: 0 auto;
`
const DailyCard = styled.div`
float: left;
border: 2px solid black;
background:	#E8E8E8;
width:25%;
height:350px;
margin-right: 40px;
margin-left: 40px;
`
const OverviewCard = styled.div`
float: left;
border: 2px solid black;
background:#E8E8E8;
width:25%;
height:405px;
margin: 0 auto;
`
const Back = styled.div`
backgroundImage: background
height: 600px;
`

function GetDesc(props: any) {

    return (
        props.periods != null ?
            <div> Details: {props && props.periods ? props.periods[0].detailedForecast : null}</div>
            :
            null
    );
}

function GetCurrentTemp(props: any) {
    return (
        props.periods != null ?
            <div> Current Temperature: {props && props.periods ? props.periods[0].temperature : null}     F</div>
            :
            null
    );



}

function TemperatureArr(props: any): [any] {
    return (
        props && props.periods ? props.periods.slice(0, 12).map((period: any) => {
            console.log(period.temperature)
            return (
                period.temperature
            );
        })
            :
            []
    );
}

function GetHigh(props: any) {
    console.log("high")
    const temps = TemperatureArr(props);
    if (temps.length > 0 && temps[0]) {
        let highTemp = temps[0];
        for (let i = 0; i < 12; ++i) {
            if (highTemp < temps[i]) {
                highTemp = temps[i];
            }
        };
        return (
            <div>
                High Temperature: {highTemp} F
            </div>
        );
    }
    else {
        return (null)
    }
}

function GetLow(props: any) {
    console.log("low")
    console.log(props)
    const temps = TemperatureArr(props);
    if (temps.length > 0 && temps[0]) {
        let lowTemp = temps[0];
        for (let i = 0; i < 12; ++i) {
            if (lowTemp > temps[i]) {
                lowTemp = temps[i];
            }
        };

        return (
            <div>
                Low Temperature: {lowTemp} F
            </div>
        );
    }
    else {
        return (null);
    }
}

function GetHourly(props: any) {

    return (
        <div>
            <h2> 12 Hour Forecast </h2>
            {
                props && props.periods && props.periods.slice(0, 12).map((period: any) => {
                    return (
                        <p> Time:  {period.startTime.substring(11, 16)} Temperature: {period.temperature} F Wind: {period.windSpeed}</p>
                    )
                })
            }

        </div>
    );
};
function GetDate(props: any) {
    return (
        props ?
            <h4>Date of Weather: {props && props.updated && props.updated.substring(0, 10)}</h4>
            :
            null

    );
}
// const currentDate: date = {

//     todaysDate: hourlyData.properties.updated.substring(0, 10)
// };



function GetLocation(props: any) {
    const state = props.relativeLocation.properties.state;
    const city = props.relativeLocation.properties.city;
    console.log(state)
    return (
        <div>
            {city}, {state}
        </div>
    );
}



function GetOverview(props: any) {

    return (
        props.periods != null ?
            <div>
                <h2> Overview Today </h2>
                <h4> Morning: </h4>
                <p>Temperature: {props && props.periods ? props.periods[0].temperature : null} F </p>
                <p>Wind Direction: {props && props.periods && props.periods[0].windDirection}</p>
                <h4> Afternoon: </h4>
                <p>Temperature: {props && props.periods && props.periods[3].temperature} F</p>
                <p>Wind Direction: {props && props.periods && props.periods[3].windDirection}</p>
                <h4> Evening: </h4>
                <p>Temperature: {props && props.periods && props.periods[8].temperature} F</p>
                <p>Wind Direction:{props && props.periods && props.periods[8].windDirection}</p>


            </div>
            :
            <h2> Overview Today </h2>
    );
}

function WeatherFinder(): JSX.Element {

    const [weatherData, setWeatherData] = useState<any>()
    const [hourlyData, setHourlyData] = useState<any>([])
    const [overviewData, setOverviewData] = useState<any>([])
    const [searchString, setSearchString] = useState<string>("")
    const [errorState, setErrorState] = useState<boolean>(false)

    const search = () => {
        setErrorState(false)
        getLocation(searchString)
            .then((res) => {

                const location = res.data.properties
                console.log(typeof (res.data.properties.relativeLocation.properties.city))
                console.log(res.data.properties.relativeLocation.properties.city)
                location && setWeatherData(location)
                getHourly(location.forecastHourly)
                    .then((res2) => {
                        console.log(res2)
                        const hourly = res2.data.properties
                        console.log(hourly)
                        hourly && setHourlyData(hourly)
                    })
                    .catch(() => {
                        setErrorState(true)
                    })
                getHourly(location.forecast)
                    .then((res2) => {
                        console.log(res2)
                        const overview = res2.data.properties
                        console.log(overview)
                        overview && setOverviewData(overview)
                    })
                    .catch(() => {
                        setErrorState(true)
                    })
            })
            .catch(() => {
                setErrorState(true)
            })
    }

    return (

        <div>
            {/* <h1> <GetLocation {...weatherData} /></h1> */}
            <div className="Page-Content">
                <div className="Search-Bar">
                    <p>Enter coordnates:</p>
                    <input
                        type="text"
                        onChange={(e) => setSearchString(e.target.value)}
                        onKeyDown={(e) => {
                            e.key === "Enter" && search()
                        }}
                    />
                    <button onClick={search}>Search</button>
                </div>

                {/* <AllCards>
                    
                    <DailyCard>
                    <h2>Daily</h2>
                    <p><GetLow /></p>
                    <p><GetHigh /></p>
                    <p><GetAvgWind /></p>
                    <p> {GetCurrentTemp()}</p>
                    <p> {GetDesc()}</p>
                    </DailyCard>
                    
                    <OverviewCard>
                    <GetOverview {...currentOverview} />
                    </OverviewCard>
                </AllCards> */}
                {errorState ? (
                    <>
                        <p>Error Finding Data For: {searchString}</p>
                    </>

                ) : (
                    <div>
                        <h1>{weatherData && <GetLocation {...weatherData} />}</h1>
                        <h2>{hourlyData && <GetDate {...hourlyData} />}</h2>
                        <AllCards>
                            <HourlyCard>
                                {hourlyData && <GetHourly {...hourlyData} />}
                            </HourlyCard>

                            <DailyCard>
                                <h2>Daily</h2>
                                {hourlyData && <GetLow {...hourlyData} />}
                                {hourlyData && <GetHigh {...hourlyData} />}
                                <p>{overviewData && <GetCurrentTemp {...overviewData} />} </p>
                                <p>{overviewData && <GetDesc {...overviewData} />}</p>
                            </DailyCard>
                            <OverviewCard>
                                {hourlyData && <GetOverview {...hourlyData} />}
                            </OverviewCard>
                        </AllCards>
                    </div>
                )}
            </div>
        </div>
    )

}


export default WeatherFinder

function getType(relativeLocation: any): any {
    throw new Error("Function not implemented.")
}
