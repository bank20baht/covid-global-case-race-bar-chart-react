import { React, useState, useEffect } from "react";
import ChartRace from "react-chart-race";
import "./styles.css";

function App() {
  const [data, setData] = useState([]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const data = [
      {
        id: 0,
        title: "GOOGL",
        value: getRandomInt(0.2, 10),
        color: "#D1B70A"
      },
      {
        id: 1,
        title: "AAPL",
        value: getRandomInt(0.2, 10),
        color: "#DBB20B"
      },
      { id: 2, title: "BABA", value: getRandomInt(0.2, 10), color: "#C49000" },
      { id: 3, title: "FB", value: getRandomInt(0.2, 10), color: "#DB960B" },
      { id: 4, title: "MSFT", value: getRandomInt(0.2, 10), color: "#D47F00" },
      { id: 5, title: "NVDA", value: getRandomInt(0.2, 10), color: "#D65F00" }
    ];

    setData([...data]);
  }, []);

  function handleChange() {
    const data = [
      {
        id: 0,
        title: "GOOGL",
        value: getRandomInt(0.2, 10),
        color: "#D1B70A"
      },
      { id: 1, title: "AAPL", value: getRandomInt(0.2, 10), color: "#DBB20B" },
      { id: 2, title: "BABA", value: getRandomInt(0.2, 10), color: "#C49000" },
      { id: 3, title: "FB", value: getRandomInt(0.2, 10), color: "#DB960B" },
      { id: 4, title: "MSFT", value: getRandomInt(0.2, 10), color: "#D47F00" },
      { id: 5, title: "NVDA", value: getRandomInt(0.2, 10), color: "#D65F00" }
    ];

    setData([...data]);
  }

  return (
    <div className="container">
      <button className="btn" onClick={handleChange}>
        Click Me!
      </button>
      <ChartRace
        data={data}
        backgroundColor="#000"
        width={600}
        padding={12}
        itemHeight={30}
        gap={20}
        titleStyle={{ font: "normal 400 10px Arial", color: "#fff" }}
        valueStyle={{
          font: "normal 400 11px Arial",
          color: "rgba(255,255,255, 1)"
        }}
      />
    </div>
  );
}

export default App;