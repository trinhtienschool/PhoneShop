//import React
import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import {UserData} from "../Data";
import {Chart as ChartJS} from 'chart.js/auto';

function BarChart(){


    const [userData, setUserData] = useState({
        labels: UserData.map((data)=>data.year),
        datasets:[{
            label: 'User Gain',
            data: UserData.map((data)=>data.userGain),
            backgroundColor: ['rgba(87,249,255,0.2)','green'],
            borderColr:'blue',
            borderWidth:2
        }]
    });
    return (
        <Bar data={userData}/>
    )
}

export default BarChart;