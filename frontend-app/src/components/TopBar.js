import { View } from "react-native";
import { Back, Profile } from "./Buttons";

const TopBar=({home})=>{
    let bar;
    if(home){
        bar=<View><Profile/></View>
    }
    else{
        bar=<View><Profile/><Back/></View>
    }
    return <View>{bar}</View>
}

export default TopBar;