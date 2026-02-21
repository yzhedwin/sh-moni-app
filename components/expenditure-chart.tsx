import React from "react";
import { Dimensions, View } from "react-native";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer } from "victory-native";

const DATA = Array.from({ length: 12 }, (_, i) => ({
  month: i,
  rent: 40 + 30 * Math.random(),
  transport: 20 + 10 * Math.random(),
  food: 30 + 20 * Math.random(),
  entertainment: 10 + 15 * Math.random(),
}));
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function getMonthName(monthIndex: number) {
  return MONTH_NAMES[monthIndex % 12];
}
const screenWidth = Dimensions.get("window").width;

export function ExpenditureChart() {
  return (
    <View style={{ height: 300, width: screenWidth }} >
      <VictoryChart theme={VictoryTheme.clean}
        domainPadding={10}
        width={screenWidth}   // must be number
        height={300}          // must be number
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => `${getMonthName(datum.month)}: $${datum.rent.toFixed(2)}`}
          />
        }>
        <VictoryAxis
          label="Month"
          tickFormat={t => `${getMonthName(t)}`}
          tickCount={12}
          tickValues={DATA.map(d => d.month)}
          style={{
            axisLabel: { padding: 30, fontSize: 12 },
            tickLabels: { fontSize: 10 },
          }}
        />

        <VictoryAxis
          dependentAxis
          label="Expenditure ($)"
          style={{
            axisLabel: { padding: 40, fontSize: 12 },
            tickLabels: { fontSize: 10 },
          }}
        />

        <VictoryLine
          data={DATA}
          // labelComponent={<VictoryTooltip />}
          // labels={({ datum }) => datum.y}
          x="month"
          y="rent"
          style={{
            data: { stroke: "red", strokeWidth: 2 },
          }}
          interpolation={
            "natural"
          }
        />

        {/* <VictoryLine
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => datum.y}
          data={DATA}
          x="month"
          y="food"
          style={{
            data: { stroke: "green", strokeWidth: 2 },
          }}
          interpolation={
            "natural"
          }
        />

        <VictoryLine
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => datum.y}
          data={DATA}
          x="month"
          y="entertainment"
          style={{
            data: { stroke: "orange", strokeWidth: 2 },
          }}
          interpolation={
            "natural"
          }
        />
        <VictoryLine
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => datum.y}
          data={DATA}
          x="month"
          y="transport"
          style={{
            data: { stroke: "blue", strokeWidth: 2 },
          }}
          interpolation={
            "natural"
          }
        /> */}

        {/* <VictoryLegend
          x={50}
          y={0}
          orientation="horizontal"
          gutter={20}
          style={{ labels: { fontSize: 12 } }}
          data={[
            { name: "Rent", symbol: { fill: "red" } },
            { name: "Transport", symbol: { fill: "blue" } },
            { name: "Food", symbol: { fill: "green" } },
            { name: "Entertainment", symbol: { fill: "orange" } },
          ]}
        /> */}
      </VictoryChart>

    </View >
  );
}