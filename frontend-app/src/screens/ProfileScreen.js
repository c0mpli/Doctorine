import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import TopBar from "../components/TopBar";
import useLogout from "../hooks/useLogout";
function ProfileScreen() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  useEffect(() => {
    console.log(user);
  }, []);
  function handleLogout() {
    logout();
  }
  return (
    <SafeAreaView>
      <View>
        <TopBar home={false} />
        <Text>Name : {user?.userData.name}</Text>
        <Text>Email : {user?.userData.email}</Text>
      </View>
      <TouchableOpacity>
        <Text onPress={handleLogout}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ProfileScreen;
