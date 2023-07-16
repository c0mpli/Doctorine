import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import { themeColors } from "../theme";
import { useState } from 'react';
import { LineChart  } from 'react-native-chart-kit';

const data= [45, 35, 54, 70, 64, 61];
// const backgroundColor=[];

// for(i=0;i<data.length;i++){
//   if(data[i]<40 || data[i]>120){backgroundColor.push('#880808')}
//   if(data[i]>=40 && data[i]<=120){backgroundColor.push('#355E3B')}
// }



const Chart=({chart})=>{
    
    return(
      <>
        <View className="ml-5 static">
        <Text className="font-bold text-lg absolute top-12">{chart}</Text>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: [data],
                strokeWidth: 0.5,
              },
            ],
          }}
          width={Dimensions.get('window').width-40}
          height={150}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={true}
          useShadowColorFromDataset={true}
          chartConfig={{
            backgroundColor: "#1fffff",
            
            backgroundGradientFrom: '#1c1c1c',
            backgroundGradientTo: '#1c1c1c',
            
            decimalPlaces: 0,
            
            color: (opacity = 1,value) => {
              return (value < 40 || value > 120) ? 'rgba(255, 0, 0, ' + opacity + ')' : 'rgba(0, 255, 0, ' + opacity + ')';
            },

            
            labelColor:(opacity=1)=>`rgba(255,255,255,${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots:{
              r:"3",
              
            }
          }}
          // bezier
          style={{
            marginVertical: 90,
            borderRadius: 8,
          }}
          
  
        />
      </View>
      
      </>
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