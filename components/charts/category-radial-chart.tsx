import { CategoryData } from "@/app/(protected)/analytics";
import { Platform, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { VictoryPie, VictoryTheme } from "victory";
type Props = {
  data: CategoryData[];
};
export function CategoryRadialChart({ data }: Props) {
  const size = 200;
  const strokeWidth = 40;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  if (Platform.OS === "web")
    return (
      <View style={{ height: 300 }}>
        <VictoryPie
          innerRadius={50}
          data={data.map((item) => ({ x: item.category, y: item.amount }))}
          theme={VictoryTheme.clean}
        />
      </View>
    );

  return (
    <Svg width={size} height={size}>
      {data.map((item, index) => {
        const strokeDasharray = `${(item.amount / 100) * circumference} ${circumference}`;
        const strokeDashoffset = -offset;

        offset += (item.amount / 100) * circumference;

        return (
          <Circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            // stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            fill="transparent"
          />
        );
      })}
    </Svg>
  );
}
