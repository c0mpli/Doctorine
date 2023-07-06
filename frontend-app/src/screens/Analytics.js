import {Text,View} from 'react-native';
import { useState } from 'react';
import Chart from '../components/Chart';
import Cards from '../components/Cards';
import { Profile } from '../components/Buttons';



const Analytics=()=>{
    
    return(
        <View className="mt-16 py-0">
           < Text className="mt-7 ml-6 font-normal text-[32px] mb-0 py-0">Shristi's</Text>
      <Text className="ml-6 font-bold text-[32px] mb-8">Analytics</Text> 
      <Profile />
        <Cards key={"101"} name="Shristi Shetty" room="102" alert="safe"hr="92" rr="13" bp="98"/>
        <Chart chart="Heart Rate" />
      </View>
    );
  };


export default Analytics;


