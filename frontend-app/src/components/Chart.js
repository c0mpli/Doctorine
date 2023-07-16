import { Text, View, StyleSheet, Dimensions } from "react-native";
import { themeColors } from "../theme";
import { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";

const Chart = ({ chart, data }) => {
  const [tempData, setTempData] = useState([]);
  const [cardData, setCardData] = useState([0]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    let t = [];
    if (chart === "Heart Rate") {
      for (let i = 0; i < data?.data.length; i++) {
        t.push(data?.data[i].HR);
      }
    } else if (chart === "Respiratory Rate") {
      for (let i = 0; i < data?.data.length; i++) {
        t.push(data?.data[i].RR);
      }
    } else if (chart === "Blood Pressure") {
      for (let i = 0; i < data?.data.length; i++) {
        t.push(data?.data[i].SBP);
      }
    }
    setTempData(t);
  }, []);

  function changeCardData() {
    if (counter < tempData.length - 1) {
      setCounter(counter + 1);
      const r = tempData[counter + 1];
      if (r === undefined) return;
      setCardData((prev) => [...prev, r]);
    } else {
      setCounter(0);
      const r = tempData[0];
      if (r === undefined) return;
      setCardData((prev) => [...prev, r]);
    }
    if (cardData.length > 10) {
      setCardData(cardData.slice(10, cardData.length));
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeCardData();
    }, 1000);
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <>
      <View className="ml-6 mb-[-86]">
        <Text className="font-bold text-lg absolute top-12">{chart}</Text>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: cardData,
                strokeWidth: 0.5,
              },
            ],
          }}
          width={Dimensions.get("window").width - 45}
          height={150}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={true}
          useShadowColorFromDataset={true}
          chartConfig={{
            backgroundColor: "#1fffff",

            backgroundGradientFrom: "#1c1c1c",
            backgroundGradientTo: "#1c1c1c",

            decimalPlaces: 0,

            color: (opacity = 1, value) => {
              return value < 40 || value > 120
                ? "rgba(255, 0, 0, " + opacity + ")"
                : "rgba(0, 255, 0, " + opacity + ")";
            },

            labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "3",
            },
          }}
          // bezier
          style={{
            marginVertical: 90,
            borderRadius: 8,
          }}
        />
      </View>
    </>
  );
};

export default Chart;
