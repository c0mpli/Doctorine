import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import { Scan } from "../components/Buttons";
import TopBar from "../components/TopBar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function HomeScreen() {
  return (
    <SafeAreaView className="relative">
      <Text className="mt-7 ml-6 font-normal text-[32px] mb-0 py-0">Your</Text>
      <Text className="ml-6 font-bold text-[32px] mb-8">Patients</Text>

      <TopBar home={true} />

      <ScrollView>
        <Cards
          key={"101"}
          name="Shristi Shetty"
          room="102"
          alert="safe"
          hr="92"
          rr="13"
          bp="98"
        />
        <Cards
          key={"102"}
          name="Shristi Shetty"
          room="103"
          hr="92"
          rr="13"
          bp="98"
        />
        <Cards
          key={"103"}
          name="Jash Doshi"
          room="104"
          hr="92"
          rr="13"
          bp="98"
        />
        <Cards
          key={"104"}
          name="Jash Doshi"
          room="105"
          hr="92"
          rr="13"
          bp="98"
        />
      </ScrollView>
      <Scan />
    </SafeAreaView>
  );
}
