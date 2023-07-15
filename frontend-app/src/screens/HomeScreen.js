import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  DatePickerIOSBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Cards from "../components/Cards";
import { Scan } from "../components/Buttons";
import TopBar from "../components/TopBar";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
export default function HomeScreen() {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const route = useRoute();
  function getData() {
    const patientId = user?.userData.patientId;
    for (let i = 0; i < patientId.length; i++) {
      axios
        .get(`https://doctorine-node.onrender.com/user/user/`, {
          params: {
            id: patientId[i],
          },
        })
        .then((res) => {
          setData((prev) => [...prev, res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getData();
  }, [route]);
  return (
    <>
      <SafeAreaView className="relative h-full">
        <Text className="mt-7 ml-6 font-normal text-[32px] mb-0 py-0">
          Your
        </Text>
        <Text className="ml-6 font-bold text-[32px] mb-8">Patients</Text>

        <TopBar home={true} />

        <ScrollView>
          {data?.map((item, i) => {
            //console.log(item.data);
            return (
              <Cards
                key={i}
                name={item.name}
                room={item.bedId[0]}
                rr={item.data[item.data.length - 1]?.RR || null}
                hr={item.data[item.data.length - 1]?.HR || null}
                bp={item.data[item.data.length - 1]?.SBP}
                alert={item.data[item.data.length - 1]?.alert}
              />
            );
          })}
        </ScrollView>
        <Scan />
      </SafeAreaView>
    </>
  );
}
