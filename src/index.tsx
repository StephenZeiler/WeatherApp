import React from "react"
import ReactDOM from "react-dom/client"
import { render } from "@testing-library/react"
import styled from 'styled-components';
import hourlyData from './hourlyData.json';
import overviewData from './overviewData.json';
import locationData from './locationData.json';

import axios from 'axios';
import LocationFinder from "./WeatherFinder";
import WeatherFinder from "./WeatherFinder";
import Weather from "./WeatherTest";
import WeatherTest from "./WeatherTest";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <React.StrictMode>
        <WeatherFinder />
    </React.StrictMode>
)
