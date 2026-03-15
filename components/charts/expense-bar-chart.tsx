import { Platform, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { Bar, CartesianChart } from "victory-native";
const data = [
  { month: "Jan", amount: 820 },
  { month: "Feb", amount: 1200 },
  { month: "Mar", amount: 950 },
  { month: "Apr", amount: 1500 },
  { month: "May", amount: 620 },
];

export default function ExpenseBarChart() {
  if (Platform.OS === "web")
    return (
      <View style={{ height: 300 }}>
        <VictoryChart domainPadding={20}>
          <VictoryAxis />
          <VictoryAxis dependentAxis />

          <VictoryBar
            data={data}
            x="month"
            y="amount"
            style={{
              data: { fill: "#10b981", width: 18 },
            }}
          />
        </VictoryChart>
      </View>
    );
  return (
    <View style={{ height: 300 }}>
      <CartesianChart data={data} xKey="month" yKeys={["amount"]}>
        {({ points }) => (
          <Bar
            points={points.amount}
            color="#10b981"
            roundedCorners={{ topLeft: 4, topRight: 4 }}
            chartBounds={{ left: 0, top: 0, right: 0, bottom: 0 }}
          />
        )}
      </CartesianChart>
    </View>
  );
}
