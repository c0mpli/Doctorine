import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import { Scan } from "../components/Buttons";
import TopBar from "../components/TopBar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
export default function HomeScreen() {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  function getData() {
    console.log(user?.userData.patientId);
    const patientId = user?.userData.patientId;
    for (let i = 0; i < patientId.length; i++) {
      axios
        .get(`https://doctorine-node.onrender.com/user/user/`, {
          params: {
            id: patientId[i],
          },
        })
        .then((res) => {
          console.log(res.data);
          setData((prev) => [...prev, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <SafeAreaView className="relative">
        <Text className="mt-7 ml-6 font-normal text-[32px] mb-0 py-0">
          Your
        </Text>
        <Text className="ml-6 font-bold text-[32px] mb-8">Patients</Text>

        <TopBar home={true} />

        <ScrollView>
          {data?.map((item, i) => {
            return (
              <Cards
                key={i}
                name={item.name}
                room={item.bedId[0]}
                rr={item.data[data.length - 1]?.RR || null}
                hr={item.data[data.length - 1]?.HR || null}
                bp={item.data[data.length - 1]?.SBP}
                alert={item.data[data.length - 1]?.alert}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
      <Scan />
    </>
  );
}
