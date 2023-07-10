import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";
import "./styles.css";
import axios from 'axios';
import { useQuery, useQueryClient } from "react-query";
const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#000080",
  "#FF4500",
  "#8B008B",
  "#008080",
  "#DC143C",
  "#FF1493",
  "#1E90FF",
  "#FFD700",
  "#6A5ACD",
  "#2E8B57",
  "#A52A2A"
];

const fetchData = async () => {
  try {
    const res = await axios.get('https://disease.sh/v3/covid-19/historical?lastdays=1000');
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function App() {
  const [racebar, setRaceBar] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2020, 5, 28));

  const { data, error, isError, isLoading } = useQuery('case', fetchData);

  useEffect(() => {
    handleChange();
  }, [currentDate]);

  useEffect(() => {
    const targetDate = new Date(2020, 6, 31); // July 31, 2020

    const timer = setInterval(() => {
      setCurrentDate((prevDate) => {
        const newDate = new Date(
          prevDate.getFullYear(),
          prevDate.getMonth(),
          prevDate.getDate() + 1
        );

        if (newDate.getTime() > targetDate.getTime()) {
          clearInterval(timer); // Stop the interval
        }

        return newDate;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function handleReset() {
    const resetDate = new Date(2020, 6, 1)
    setCurrentDate(resetDate)
  }

  function handleChange() {
    const formattedDate = currentDate.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    });

    if (data && data.length > 0) {
      const outputJson = data.map((item, index) => ({
        id: index,
        title: item.country,
        value: item.timeline.cases[formattedDate],
        color: COLORS[index % COLORS.length]
      }));
      setRaceBar(outputJson);
    }
  }

  if (isLoading) {
    return <h1 style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>Loading....</h1>;
  }

  if (isError) {
    return <h1 style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>Error! {error.message}</h1>;
  }

  const formattedDate = currentDate.toLocaleString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  });


  return (
    <div className="container">
      <div>
        <h1 style={{ textAlign: 'center' }}>Covid Global Cases By Nattapong Promthong</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <text>Date: {formattedDate}</text>
          <text onClick={handleReset} >{' reset'}</text>
        </div>
      </div>
      <ChartRace
        data={racebar}
        backgroundColor="#fff"
        width={1280}
        padding={5}
        itemHeight={30}
        gap={20}
        titleStyle={{ font: "normal 400 10px Arial", color: "#000" }}
        valueStyle={{ font: "normal 400 11px Arial", color: "#000" }}
      />
    </div>
  );
}

export default App;
