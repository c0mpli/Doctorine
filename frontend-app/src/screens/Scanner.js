import React, { useState, useEffect } from 'react'
import DocumentScanner from 'react-native-document-scanner-plugin'
import { TouchableOpacity, Image ,View} from 'react-native';


const Scanner = () => {
    const [scannedDoc,setScannedDoc]=useState();

    
    const scanDocument = async () => {
        // start the document scanner
        const { scannedDocs } = await DocumentScanner.scanDocument({
            croppedImageQuality:100,
        });
      
        // get back an array with scanned image file paths
        if (scannedDocs.length > 0) {
          // set the img src, so we can view the first scanned image
          setScannedDoc(scannedDocs[0])
        }
      }

      useEffect(() => {
        // call scanDocument on load
        scanDocument()
      }, []);

    return (
        <View className="bg-blue-500 absolute bottom-0 right-5">
            
            {scannedDoc !=null && (
                <Image 
                source={{uri:scannedDoc}} 
                resizeMode='contain'
                style={{width:'100%',height:'50%'}}/>
            )}
            
            <TouchableOpacity style={{
                width:70, height:70, borderRadius:35, backgroundColor:'black', position:'absolute',bottom:20,alignSelf:'center'
            }} onPress={()=>{scanDocument();}}></TouchableOpacity>
        </View>
    )
};
export default Scanner;