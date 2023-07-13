import { View } from "react-native";
import { Back, Profile } from "./Buttons";

const TopBar = ({ home }) => {
  return (
    <View>
      {home ? (
        <View>
          <Profile />
        </View>
      ) : (
        <View>
          <Profile />
          <Back />
        </View>
      )}
    </View>
  );
};

export default TopBar;
