import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";
import "./styles.css";
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [racebar, setRaceBar] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date(2023, 2, 9));

  const fetchData = async () => {
    try {
      const res = await axios.get('https://disease.sh/v3/covid-19/historical');
      console.log(res.data);
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
    handleChange()
  }, [currentDate])

  function handleChange() {
    const outputJson = data.map((item, index) => {
      console.log(item.timeline.cases.date);
      return {
        id: index,
        title: item.country,
        value: item.timeline.cases[formattedDate],
        color: getRandomColor()
      };
    });
    console.log(outputJson);
    setRaceBar(outputJson);
  }

  const handlerPrevDate = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
    );
    setCurrentDate(newDate);
  };

  const handlerNextDate = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1,
    );
    setCurrentDate(newDate);
  };

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
      <button className="btn" onClick={handleChange}>
        Click Me!
      </button>
      <div style={{
        display: 'flex',
        flexDirection: 'row'
      }}>
        <h2 onClick={() => handlerPrevDate()}>{'<< '}</h2>
        <h2>{formattedDate}</h2>
        <h2 onClick={() => handlerNextDate()}>{' >>'}</h2>
      </div>

      <ChartRace
        data={racebar}
        backgroundColor="#fff"
        width={600}
        padding={12}
        itemHeight={30}
        gap={20}
        titleStyle={{ font: "normal 400 10px Arial", color: "#000" }}
        valueStyle={{
          font: "normal 400 11px Arial",
          color: "#000"
        }}
      />
    </div>
  );
}

export default App;
