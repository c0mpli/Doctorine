import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import Analytics from "./src/screens/Analytics";
import Scanner from "./src/screens/Scanner";
import Home from "./react-native-document-scanner-example/screens/Home";
// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Chart"
          options={{ headerShown: false }}
          component={Analytics}
        />
        <Stack.Screen 
        name="Scanner" 
        options={{ headerShown: false }} 
        component={Scanner} />
      </Stack.Navigator>
      <Stack.Screen name="ScannerHome" 
      options={{ headerShown: false }} 
      component={Home} />
    </NavigationContainer>
  );
}
