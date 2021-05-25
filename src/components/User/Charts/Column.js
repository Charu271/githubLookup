import React, { Component } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

class Column extends Component {
  render() {
    return (
      <CanvasJSChart
        options={{
          animationEnabled: true,
          exportEnabled: true,
          backgroundColor: "#1E2742",
          theme: "dark1",
          title: {
            text: "Most starred Repo's",
            fontColor: "#a2a2a3",
          },
          axisX: {
            lineColor: "#a2a2a3",
            labelFontColor: "#a2a2a3",
            titleFontColor: "#a2a2a3",
          },
          axisY: {
            lineColor: "#a2a2a3",
            labelFontColor: "#a2a2a3",
            titleFontColor: "#a2a2a3",
          },
          data: [
            {
              type: "column",
              colorSet: ["#bb86fc", "#ee7a8b", "#f9c270", "#64cce8"],
              dataPoints: this.props.starData,
            },
          ],
        }}
      />
    );
  }
}

export default Column;
