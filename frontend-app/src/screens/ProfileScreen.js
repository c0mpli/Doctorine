import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuthContext } from "../hooks/useAuthContext";
import TopBar from "../components/TopBar";
import useLogout from "../hooks/useLogout";
const ProfileScreen = ({ navigation }) => {
  // Dummy user data
  const profileIcon = require("../assets/user.png");
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
    navigation.navigate("Login");
  };

  const handleBackButton = () => {
    // Add your back button logic here
    // For example, navigating back to the previous screen
    navigation.goBack();
  };

  return (
    <>
      <View className="mt-10 h-full">
        <View className="mt-36">
          <TopBar home={false} />
        </View>
        <View style={styles.profileContainer}>
          <Image source={profileIcon} style={styles.profileIcon} />
          <Text style={styles.name}>{user?.userData.name}</Text>
          <Text style={styles.email}>{user?.userData.email}</Text>
          <Text style={styles.hospital}>{"West Blue"}</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          className="bg-blue-500"
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  hospital: {
    fontSize: 16,
  },
  logoutButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default ProfileScreen;
