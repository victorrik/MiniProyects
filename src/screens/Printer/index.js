import React, { useState, useEffect} from "react";
import { StyleSheet, View, TextInput } from "react-native";
import {
  BLEPrinter,
  NetPrinter,
  USBPrinter, 
} from "react-native-thermal-receipt-printer";
//import { BleManager } from 'react-native-ble-plx';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
  BluetoothTscPrinter,
} from "tp-react-native-bluetooth-printer";
import BleManager from 'react-native-ble-manager';
import { Button,Text,IcoBootstrap } from "../../components";
import Loader from "./Loader";

let options = {
  width: 40,
  height: 30,
  gap: 20,
  direction: BluetoothTscPrinter.DIRECTION.FORWARD,
  reference: [0, 0],
  tear: BluetoothTscPrinter.TEAR.ON,
  sound: 0,
  text: [
    {
      text: "I am a testing text",
      x: 20,
      y: 0,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
    {
      text: "Second testing text",
      x: 20,
      y: 50,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
  ],
  qrcode: [
    {
      x: 20,
      y: 96,
      level: BluetoothTscPrinter.EEC.LEVEL_L,
      width: 3,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      code: "show me the money",
    },
  ],
  barcode: [
    {
      x: 120,
      y: 96,
      type: BluetoothTscPrinter.BARCODETYPE.CODE128,
      height: 40,
      readable: 1,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      code: "1234567890",
    },
  ], 
};

export default function App() { 
  const [printerType, setPrinterType] = useState(null);
  const [printerTypeSelected, setPrinterTypeSelectet] = useState(0);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState({});
  useEffect(() => {
    checoStado()
  }, [])
  const checoStado = async() => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        console.log(enabled)
      },
      (err) => {
        console.log(err)
      }
    );
  }
  
  const handleConnectSelectedPrinter = () => { 
    if (!selectedPrinter) return;
    const connect = async () => {
      try {
        setLoading(true);
        switch (printerTypeSelected) {
          case 2:
            try{
              console.log(selectedPrinter.id)
              await BLEPrinter.connectPrinter(
                selectedPrinter?.id || ""
              );
            }catch(e){
              console.log(e)
            }
            break;
          case 1:
            await NetPrinter.connectPrinter(
              selectedPrinter?.host || "",
              selectedPrinter?.port || 9100
            );
            break;
          case 3:
            await USBPrinter.connectPrinter(
              selectedPrinter?.vendor_id || "",
              selectedPrinter?.product_id || ""
            );
            break;
          default:
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    };
    connect();
  };

  const handlePrint = async () => {
    console.log('imprime')
    BluetoothTscPrinter.printLabel(options).then(
      () => {
        //success
        console.log('success')
      },
      (err) => {
        //error
        console.log('error')
      }
    );
    return 
    try { 
      await printerType.printBill("<C>sample text</C>\n");
    } catch (err) {
      console.warn(err);
    }
  };
  
  const BTConnection=async()=>{ 
    BluetoothManager.scanDevices().then(
      (scannedDevices) => {
        console.log('scannedDevices',scannedDevices)
        const parsedObj = JSON.parse(scannedDevices);
         console.log(parsedObj)
         setDevices(
          parsedObj.paired
        );
      },
      (er) => {
      
        console.log("error" + JSON.stringify(er));
      }
    );
    
  }

  const testPeripheral = ( ) => {
    let peripheral = selectedPrinter;
    console.log('inicio',peripheral)
    if (peripheral){
      setLoading(true)
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
        setSelectedPrinter(prev=>({...prev,connected:false})) 
        setLoading(false)
      }else{
        BleManager.connect(peripheral.id).then(() => {
          setSelectedPrinter(prev=>({...prev,connected:true})) 
          console.log('Connected to ' + peripheral.id); 
          
          handleConnectSelectedPrinter()
        }).catch((error) => {

          console.log('Connection error', error);
          setLoading(false)
        });
      }
    }

  }
 const handlePrinterType = (printerType,num) => { 
  
  /**const manager = new BleManager();
  manager.startDeviceScan(null, null, (error, dispo) => {
      if (error) {
        console.log('error',error)
          // Handle error (scanning will be stopped automatically)
          return
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      console.log('dispo',dispo) 
      manager.stopDeviceScan();
  }); */
   setPrinterType(prev=>{
     //if (prev) { prev.closeConn(); }
     return printerType
   })
   setSelectedPrinter(null)
   setPrinterTypeSelectet(num)
   getPrinterList(printerType,num)
   
 }
 const getPrinterList=async(Printer,num)=>{
   if (num === 1) { return null}; 
   if (num === 2) { 
    BTConnection()
     return null
    }; 
   
  try {
      setLoading(true);
      await Printer.init();
      const results = await Printer.getDeviceList();
      console.log('results',results)
      setDevices(
        results.map(({device_name,inner_mac_address}) => ({ name:device_name,id:inner_mac_address }))
      );
    } catch (err) {
      console.warn(err);
      setDevices([])
    } finally {
      setLoading(false);
    }
  }; 
  const coneeee=()=>{
    console.log(selectedPrinter.address)
    BluetoothManager.connect(selectedPrinter.address) // the device address scanned.
  .then(
    (s) => {
      console.log('s',s)
    },
    (e) => { 
      console.log('e',e)
    }
  );
  }
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text h2 >Seleccione el tipo de impresora: </Text> 
          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}} >
          <Button style={{backgroundColor:printerTypeSelected === 1?'green':'gray'}}  onPress={()=>handlePrinterType(NetPrinter,1)} >
            <IcoBootstrap name="router" size={50} color="white" />
          </Button>
          <Button style={{backgroundColor:printerTypeSelected === 2?'green':'gray'}}  onPress={()=>handlePrinterType(BLEPrinter,2)} >
            <IcoBootstrap name="bluetooth" size={50} color="white" />
          </Button>
          <Button style={{backgroundColor:printerTypeSelected === 3?'green':'gray'}}  onPress={()=>handlePrinterType(USBPrinter,3)} >
            <IcoBootstrap name="usbSymbol" size={50} color="white" />
          </Button>
          </View>
      </View>
      <View style={{marginTop:30}}>
        <Text>Select printer: </Text> 
        <View>
        {devices.map((obj,index)=>
        <View key={`printer-item-${index}`} style={{marginTop:10}}  >
          <Button style={{backgroundColor:obj.id === selectedPrinter?.id? 'blue':'gray'}}  onPress={()=>setSelectedPrinter(obj)} >
            <Text h3 style={{color:'white'}} >{obj.name}</Text>
            <Text style={{color:'white'}} >{obj.id}</Text>
          </Button>
          </View>
        )}
        </View>
      </View>
      <View style={{marginTop:20}} >
        <Button
          disabled={!selectedPrinter?.name} 
          onPress={coneeee}
        >
          <Text>Connect</Text>
          </Button>
        <Button
          disabled={!selectedPrinter?.name}
          
          onPress={handlePrint}
          >
            <Text>Print sample</Text>
            </Button>
 
            
      </View>
      <Loader loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 15,
  },
  section: { 
  },
  rowDirection: {
    flexDirection: "row",
  },
});