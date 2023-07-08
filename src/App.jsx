import { React, useState, useEffect } from "react";
import ChartRace from "react-chart-race";
import "./styles.css";
import axios from 'axios'
function App() {
  const [data, setData] = useState([]);
  const [racebar, setReceBar] = useState([])

  const fetchData = async () => {
    try {
      const res = await axios.get('https://disease.sh/v3/covid-19/historical')
      console.log(res.data)
      setData(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  function handleChange() {
    const outputJson = data.map((item, index) => {
      console.log(item.timeline.cases.date)
      return {
        id: index,
        title: item.country,
        value: item.timeline.cases["2/8/23"],
        color: "#D1B70A"
      }
    })
    console.log(outputJson)
    setReceBar(outputJson)
    console.log(data[0].timeline.cases["2/8/23"])
  }

  return (
    <div className="container">
      <button className="btn" onClick={handleChange}>
        Click Me!
      </button>
      <ChartRace
        data={racebar}
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