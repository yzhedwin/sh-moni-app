import { Circle, Text as SkiaText, useFont } from "@shopify/react-native-skia";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { SharedValue, useAnimatedReaction } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import Inter from '../assets/fonts/Inter.ttf';

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
const lines = [
  { key: "rent", color: "red" },
  { key: "transport", color: "blue" },
  { key: "food", color: "green" },
  { key: "entertainment", color: "orange" },
];
interface Category {
  name: string;
  color: string;
}

function ToolTip({ x, y, category }: { x: SharedValue<number>; y: SharedValue<number>; category: Category }) {
  const font = useFont(Inter, 10);

  return (
    <>
      <Circle cx={x} cy={y} r={8} color={category.color} />
      <SkiaText x={x} y={y} text={category.name.charAt(0).toUpperCase() + category.name.slice(1)} font={font} color="black" />
      {/* <SkiaText x={x} y={y} text={`$${y.get().toFixed(2)}`} font={font} color="black" /> */}
    </>
  );
}

export function ExpenditureChart() {
  const { state, isActive } = useChartPressState({ x: 0, y: { rent: 0, transport: 0, food: 0, entertainment: 0 } });
  const font = useFont(Inter, 10);
  const [total, setTotal] = useState(0);

  useAnimatedReaction(
    () =>
      state.y.rent.value.value +
      state.y.transport.value.value +
      state.y.food.value.value +
      state.y.entertainment.value.value,
    (currentTotal, previousTotal) => {
      if (currentTotal !== previousTotal) {
        scheduleOnRN(setTotal, currentTotal);
      }
    }
  );

  return (
    <View style={{ height: 300, width: screenWidth - 50 }} >
      <CartesianChart
        data={DATA}
        xKey="month"
        yKeys={lines.map((l) => l.key)}
        domainPadding={{ right: 10, left: 10 }}
        xAxis={{ font, formatXLabel: getMonthName, tickCount: 12 }}
        yAxis={[
          {
            font
          }
        ]}
        chartPressState={state}
      >
        {({ points }: { points: any }) => (
          <>
            {lines.map((line) => (
              <Line
                key={line.key}
                points={points[line.key]}
                color={line.color}
                strokeWidth={3}
              />
            ))}
            {isActive && (
              lines.map((line) => (
                <ToolTip key={line.key} x={state.x.position} y={state.y[line.key].position} category={{ name: line.key, color: line.color }} />
              ))
            )}
          </>
        )}
      </CartesianChart>
      {isActive ? <Text>Monthly Expenditure: ${total.toFixed(2)}</Text> : <Text>Tap on the chart to see details</Text>}
    </View >
  );
}