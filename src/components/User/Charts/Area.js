import React, { Component } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

class Area extends Component {
  render() {
    return (
      <CanvasJSChart
        style={{ width: "90%", padding: "10%", overflowY: "hidden" }}
        options={{
          animationEnabled: true,
          exportEnabled: true,
          colorSet: ["orange", "red"],
          backgroundColor: "#1E2742",
          theme: "dark1", // "light1", "dark1", "dark2"
          title: {
            text: "Weekly contributions",
            fontColor: "#a2a2a3",
          },
          axisY: {
            title: "Commits",
            gridThickness: 0,
            lineColor: "#a2a2a3",
            labelFontColor: "#a2a2a3",
            titleFontColor: "#a2a2a3",
            interval: 10,
            maximum: "100",
            tickColor: "white",
          },
          axisX: {
            title: "Week",
            prefix: "W",
            interval: 4,
            lineColor: "#a2a2a3",
            labelFontColor: "#a2a2a3",
            titleFontColor: "#a2a2a3",
            tickColor: "#fff",
          },
          data: [
            {
              type: "spline",
              lineColor: "#25bfb6",
              markerColor: "#25bfb6",
              markerSize: 0,
              color: "rgb(39,30,61)",
              toolTipContent: "Week {x}: {y}%",
              dataPoints: this.props.data,
            },
          ],
        }}
      />
    );
  }
}

export default Area;
