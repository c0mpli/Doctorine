import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  DatePickerIOSBase,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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
  const [cardData, setCardData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const route = useRoute();
  function getData() {
    const patientId = user?.userData?.patientId;
    for (let i = 0; i < patientId.length; i++) {
      axios
        .get(`https://doctorine-node.onrender.com/user/user/`, {
          params: {
            id: patientId[i],
          },
        })
        .then((res) => {
          setName(res.data.name);
          setRoom(res.data.bedId[0]);
          setData(res.data.data);
          setCardData(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useMemo(() => {
    getData();
  }, [route]);

  function changeCardData() {
    if (counter < data.length - 1) {
      setCounter(counter + 1);
      setCardData(data[counter + 1]);
    } else {
      setCounter(0);
      setCardData(data[0]);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeCardData();
    }, 1000);
    return () => clearInterval(interval);
  }, [cardData]);
  return (
    <>
      <SafeAreaView className="relative h-full">
        <Text className="mt-7 ml-6 font-normal text-[32px] mb-0 py-0">
          Your
        </Text>
        <Text className="ml-6 font-bold text-[32px] mb-8">Patients</Text>

        <TopBar home={true} />

        <ScrollView>
          <Cards
            hr={cardData.HR}
            rr={cardData.RR}
            bp={cardData.SBP}
            alert={cardData.alert}
            name={name}
            room={room}
            data={data}
          />
        </ScrollView>
        <Scan />
      </SafeAreaView>
    </>
  );
}
