import React, { useState } from "react"
import { getLocation } from "./WeatherService"

function GetLocation(props: any) {
    return (
        <div>
            {props && props.data}
        </div>
        // {props.relativeLocation.properties.state}
    );
}

function BeverageFinder(): JSX.Element {
    const [weatherData, setWeatherData] = useState<any>([])
    const [searchString, setSearchString] = useState<string>("")
    const [errorState, setErrorState] = useState<boolean>(false)

    const search = () => {
        setErrorState(false)
        getLocation(searchString)
            .then((res) => {
                const location = res.data.properties
                location && setWeatherData(location)
            })
            .catch(() => {
                setErrorState(true)
            })
    }

    return (
        <div className="Page-Content">
            <div className="Search-Bar">
                <p>Enter Coordinates:</p>
                <input
                    type="text"
                    onChange={(e) => setSearchString(e.target.value)}
                    onKeyDown={(e) => {
                        e.key === "Enter" && search()
                    }}
                />
                <button onClick={search}>Search</button>
            </div>
            {errorState ? (
                <>
                    <p>Error Finding Weather Data For: {searchString}</p>
                </>
            ) : (
                <div className="Beverage-Card-Container">
                    <GetLocation {...weatherData} />
                </div>
            )}
        </div>
    )
}

export default BeverageFinder
