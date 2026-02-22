import { Circle, Text as SkiaText, useFont } from "@shopify/react-native-skia";
import React, { useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { useAnimatedReaction } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import Inter from "../assets/fonts/Inter.ttf";

const DATA = Array.from({ length: 12 }, (_, i) => ({
  month: i,
  rent: 40 + 30 * Math.random(),
  transport: 20 + 10 * Math.random(),
  food: 30 + 20 * Math.random(),
  entertainment: 10 + 15 * Math.random(),
}));
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const screenWidth = Dimensions.get("window").width;
const lines = [
  { name: "rent", color: "red" },
  { name: "transport", color: "blue" },
  { name: "food", color: "green" },
  { name: "entertainment", color: "orange" },
] as Category[];

const EXPENDITURE_KEYS: ExpenditureCategory[] = [
  "rent",
  "transport",
  "food",
  "entertainment",
];

function getMonthName(monthIndex: number) {
  return MONTH_NAMES[monthIndex % 12];
}

function ToolTip({
  expenditure,
  category,
}: {
  expenditure: ExpenditurePoint;
  category: Category;
}) {
  const font = useFont(Inter, 10);
  const x = expenditure.position.x;
  const y = expenditure.position.y;

  return (
    <>
      <Circle cx={x} cy={y} r={4} color={category.color} />
      <SkiaText
        x={x - 10}
        y={y - 10}
        text={category.name.charAt(0).toUpperCase() + category.name.slice(1)}
        font={font}
        color="black"
      />
      {/* <SkiaText x={x} y={y} text={`$${y.get().toFixed(2)}`} font={font} color="black" /> */}
    </>
  );
}

export function ExpenditureChart() {
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { rent: 0, transport: 0, food: 0, entertainment: 0 },
  });
  const font = useFont(Inter, 10);
  const [total, setTotal] = useState(0);
  const [expediture, setExpediture] = useState<Expenditure>();

  useAnimatedReaction(
    () =>
      EXPENDITURE_KEYS.reduce((sum, key) => sum + state.y[key].value.value, 0),
    (currentTotal, previousTotal) => {
      if (currentTotal !== previousTotal) {
        scheduleOnRN(setTotal, currentTotal);
      }
      const expenditure = EXPENDITURE_KEYS.reduce((acc, key) => {
        acc[key] = {
          value: state.y[key].value.value,
          position: {
            x: state.x.position.value,
            y: state.y[key].position.value,
          },
        };
        return acc;
      }, {} as Expenditure);
      scheduleOnRN(setExpediture, expenditure);
    },
  );

  return (
    <View style={{ height: 300, width: screenWidth - 50 }}>
      <CartesianChart
        data={DATA}
        xKey="month"
        yKeys={lines.map((l) => l.name)}
        domainPadding={{ right: 10, left: 10 }}
        xAxis={{ font, formatXLabel: getMonthName, tickCount: 12 }}
        yAxis={[
          {
            font,
          },
        ]}
        chartPressState={state}
      >
        {({ points }: { points: any }) => (
          <>
            {lines.map((line) => (
              <>
                <Line
                  key={line.name}
                  points={points[line.name]}
                  color={line.color}
                  strokeWidth={3}
                />
                {isActive && (
                  <ToolTip
                    key={line.name + "-tooltip"}
                    expenditure={expediture[line.name]}
                    category={{ name: line.name, color: line.color }}
                  />
                )}
              </>
            ))}
          </>
        )}
      </CartesianChart>
      {isActive ? (
        <Text>Monthly Expenditure: ${total.toFixed(2)}</Text>
      ) : (
        <Text>Tap on the chart to see details</Text>
      )}
    </View>
  );
}

interface Category {
  name: string;
  color: string;
}

interface Expenditure {
  rent: ExpenditurePoint;
  transport: ExpenditurePoint;
  food: ExpenditurePoint;
  entertainment: ExpenditurePoint;
}

interface ExpenditurePoint {
  value: number;
  position: Coordinate;
}
interface Coordinate {
  x: number;
  y: number;
}

type ExpenditureCategory = keyof Expenditure;
