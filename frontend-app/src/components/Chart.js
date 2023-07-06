import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { themeColors } from "../theme";
import { useState } from 'react';
import { LineChart  } from 'react-native-chart-kit';



const Chart=(chart)=>{
    
    return(
        <View className="ml-5 static">
        <Text className="font-bold text-lg absolute top-12">{chart}</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat','Sun'],
            datasets: [
              {
                data: [92, 85, 91, 88, 92, 91],
                strokeWidth: 1,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={200}
          chartConfig={{
            backgroundColor: '#1c1c1c',
            backgroundGradientFrom: '#1c1c1c',
            backgroundGradientTo: '#1c1c1c',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 250, 250, ${opacity})`,
            style: {
              borderRadius: 10,
            },
          }}
          style={{
            marginVertical: 90,
            borderRadius: 5,
          }}
        />
      </View>
    );
  };


export default Chart;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
  });