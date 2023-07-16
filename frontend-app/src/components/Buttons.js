import { View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export const Profile = () => {
  const navigator = useNavigation();
  const icon = `<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.57903 10.556C11.2178 10.556 13.357 8.41682 13.357 5.778C13.357 3.13918 11.2178 1 8.57903 1C5.94021 1 3.80103 3.13918 3.80103 5.778C3.80103 8.41682 5.94021 10.556 8.57903 10.556Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.00002 17.2014C0.998748 16.8655 1.07387 16.5337 1.21971 16.2311C1.67738 15.3158 2.968 14.8307 4.03893 14.611C4.81129 14.4462 5.59432 14.336 6.38218 14.2815C7.84085 14.1533 9.30795 14.1533 10.7666 14.2815C11.5544 14.3367 12.3374 14.4468 13.1099 14.611C14.1808 14.8307 15.4714 15.27 15.9291 16.2311C16.2224 16.8479 16.2224 17.564 15.9291 18.1808C15.4714 19.1419 14.1808 19.5812 13.1099 19.7918C12.3384 19.9634 11.5551 20.0766 10.7666 20.1304C9.57938 20.2311 8.3866 20.2494 7.19683 20.1854C6.92223 20.1854 6.65678 20.1854 6.38218 20.1304C5.59665 20.0773 4.81633 19.9641 4.04809 19.7918C2.968 19.5812 1.68653 19.1419 1.21971 18.1808C1.07461 17.8747 0.999568 17.5401 1.00002 17.2014Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  const Icon = () => <SvgXml xml={icon} width="100%" />;
  return (
    <TouchableOpacity
      className="z-2 absolute w-20 h-20 rounded-full bg-white right-4 -top-32 "
      onPress={() => navigator.navigate("Profile")}
    >
      <View className="top-7">
        <Icon />
      </View>
    </TouchableOpacity>
  );
};

export const Back = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="z-2 fixed w-10 h-10 rounded-full bg-white left-4 -top-32 "
      onPress={() => navigation.goBack()}
    >
      <View className="top-2.5 ml-2">
        <ArrowLeftIcon size="20" color="black" />
      </View>
    </TouchableOpacity>
  );
};

export const Scan = () => {
  const scanner = `<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3933 6.03818V4.97897C19.3958 3.92294 18.9773 2.90945 18.2306 2.16272C17.4839 1.41599 16.4704 0.997568 15.4144 1.00001H14.6499M2.81434 6.03818V4.97897C2.81191 3.92453 3.22906 2.91245 3.9738 2.16598C4.71854 1.41952 5.72965 1.00002 6.78409 1.00002H7.5854M19.3933 10.0816V13.6C19.3958 14.6561 18.9773 15.6695 18.2306 16.4163C17.4839 17.163 16.4704 17.5814 15.4144 17.579H14.6499M2.81434 10.0816V13.6C2.8119 14.6561 3.23032 15.6695 3.97705 16.4163C4.72378 17.163 5.73727 17.5814 6.7933 17.579H7.5854" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.171 10.0811H1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  const ScanImage = () => <SvgXml xml={scanner} width="100%"/>;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="w-16 h-16 rounded-full bg-blue-500 absolute bottom-10 right-5 z-2"
      onPress={() => navigation.navigate("ImageClicker")}
    >
      <View className="mx-0.5 my-5 -z-1">
        <ScanImage />
      </View>
    </TouchableOpacity>
  );
};
