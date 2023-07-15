import { View } from "react-native";
import { Back, Profile } from "./Buttons";

const TopBar = ({ home }) => {
  return (
    <View>
      {home ? (
        <View className="mt-6 mr-1">
          <Profile />
        </View>
      ) : (
        <View className="flex-row">
          <Back />
          <Profile />
        </View>
      )}
    </View>
  );
};

export default TopBar;
