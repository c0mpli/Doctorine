import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { SafeAreaView, Text, View } from "react-native";
import TopBar from "../components/TopBar";

function ProfileScreen() {
  const { user } = useAuthContext();
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <SafeAreaView>
      <View>
        <TopBar home={false} />
        <Text>Name : {user?.userData.name}</Text>
        <Text>Email : {user?.userData.email}</Text>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
