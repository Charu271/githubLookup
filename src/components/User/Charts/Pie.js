import React, { Component } from "react";
import { CanvasJSChart } from "canvasjs-react-charts";

class Pie extends Component {
  render() {
    console.log(this.props.pieData);
    return (
      <CanvasJSChart
        options={{
          animationEnabled: true,
          exportEnabled: true,
          colorSet: this.props.pieColor,
          theme: "dark1",
          backgroundColor: "#1E2742", // "light1", "dark1", "dark2"
          title: {
            text: "Top Languages",
            fontColor: "#a2a2a3",
          },
          data: [
            {
              type: "pie",
              indexLabelFontColor: "#a2a2a3",
              indexLabel: "{label}: {y}%",
              startAngle: -90,
              dataPoints: this.props.pieData,
            },
          ],
        }}
      />
    );
  }
}

export default Pie;
