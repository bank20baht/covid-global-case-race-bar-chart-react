import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";
import "./styles.css";
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [racebar, setRaceBar] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2020, 5, 18));

  const fetchData = async () => {
    try {
      const res = await axios.get('https://disease.sh/v3/covid-19/historical?lastdays=1000');
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formattedDate = currentDate.toLocaleString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleChange();
  }, [currentDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );
      setCurrentDate(newDate);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [currentDate]);

  function handleChange() {
    const outputJson = data.map((item, index) => ({
      id: index,
      title: item.country,
      value: item.timeline.cases[formattedDate],
      color: '#000'
    }));
    setRaceBar(outputJson);
  }

  function handlerPrevDate() {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
    );
    setCurrentDate(newDate);
  }

  function handlerNextDate() {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    setCurrentDate(newDate);
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="container">
      <div>
        <h1 style={{ textAlign: 'center' }}>Covid Global Cases</h1>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <h2 onClick={handlerPrevDate}>{'<< '}</h2>
          <h2>{formattedDate}</h2>
          <h2 onClick={handlerNextDate}>{' >>'}</h2>
        </div>
      </div>

      <ChartRace
        data={racebar}
        backgroundColor="#fff"
        width={1080}
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
