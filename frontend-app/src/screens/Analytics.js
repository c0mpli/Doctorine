import { Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Cards from "../components/Cards";
import { Profile } from "../components/Buttons";
import TopBar from "../components/TopBar";
import { useRoute } from "@react-navigation/native";

const Analytics = () => {
  const route = useRoute();
  const data = route.params;

  return (
    <View className="relative mt-10 py-0">
      <View className="top-36">
        <TopBar home={false} />
      </View>
      <Text className="mt-7 ml-6 font-normal text-[32px] mb-0 py-0">
        {`${data["name"]}'s`}
      </Text>
      <Text className="ml-6 font-bold text-[32px] mb-8">Analytics</Text>

      {/* <Cards
        key={"101"}
        name={data["name"]}
        room={data["room"]}
        alert={data["alert"]}
        hr={data["hr"]}
        rr={data["rr"]}
        bp={data["bp"]}
      /> */}
      <ScrollView className="bottom-5">
        <Chart chart="Heart Rate" data={data} />
        <Chart chart="Respiratory Rate" data={data} />
        <Chart chart="Blood Pressure" data={data} />
        <Chart chart="" />
      </ScrollView>
    </View>
  );
};

export default Analytics;
