import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [longitude, setLongitude] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const handleGetLocation = () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
    
      if (status !== 'granted') {
        setErrorMsg('Permissão de acesso negada!');
      } else {
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        }
        catch (err) {
          setErrorMsg('Algum erro ocorreu.')
        }
      }
    })();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          color={"#3fc495"}
          onPress={() => handleGetLocation()} 
          title={"Localização"} />
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.position}> 
          <Text style={styles.textLabel}>
            Latitude
          </Text>
          <Text style={styles.text}>
            {latitude}
          </Text>
        </View>

        <View style={styles.position}> 
          <Text style={styles.textLabel}>
          Longitude 
          </Text>
          <Text style={styles.text}>
          {longitude}
          </Text>
        </View>

        <Text style={styles.disclaimer} > {errorMsg} </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 50
  },
  locationContainer: {
    display: "flex",
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    paddingTop: 30,
    minWidth: 300,
    alignItems: "center",
  },
  position: {
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },  
  textLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#099184",
    marginBottom: 5
  },
  text: {
    fontSize: 18,
    color: "#828282"
  }
});
