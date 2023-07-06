import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

// subscribe for more videos like this :)
export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4" style={{ backgroundColor: themeColors.lightBlue }}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/Login.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4 py-0">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-2 py-1"
            placeholder="Enter Name"
          />
          <Text className="text-gray-700 ml-4 py-2">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 py-0"
            placeholder="Enter Email"
          />
          <Text className="text-gray-700 ml-4 py-2">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 py-0"
            secureTextEntry={true}
            placeholder="Enter Password"
          />
           <Text className="text-gray-700 ml-4 py-1">Confirm Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7 py-1"
            secureTextEntry={true}
            placeholder="Re-Enter Password"
          />
          <TouchableOpacity className="py-3 rounded-xl" 
          style={styles={backgroundColor:themeColors.black}}>
            <Text className="font-xl font-bold text-center text-white"
              onPress={() => navigation.navigate("Home")}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
            <Text className="font-semibold" style={styles={color:themeColors.lightBlue}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
