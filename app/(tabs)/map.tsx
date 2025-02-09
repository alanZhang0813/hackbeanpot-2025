import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
// import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

type Coords = {
  latitude: number;
  longitude: number;
};

type NameResponse = {
  display_name: string;
  address: {
    city?: string;
    town?: string;
    village?: string;
    country?: string;
  };
}

export default function MapScreen() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [locName, setLocName] = useState('');

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setCoords(userLocation.coords);
    };

    getLocation();
  }, []);

  let text = 'Waiting for location...';
  if (errorMsg) {
    text = errorMsg;
  } else if (coords) {
    text = `Lat: ${coords.latitude}, Lon: ${coords.longitude}`;
  }

  function isNameResponse(data: unknown): data is NameResponse {
    return (
      typeof data === 'object' &&
      data !== null &&
      'display_name' in data &&
      typeof (data as NameResponse).display_name === 'string'
    );
  }

  const fetchLocationName = async () => {
    if (!coords) return;

    const { latitude, longitude } = coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    if (!latitude || !longitude) {
      console.error('Invalid coordinates');
      setLocName('Invalid coordinates');
      return;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (isNameResponse(data) && data.address.city) {
        // console.log(data.display_name);
        setLocName(data.address.city)
        return data.display_name || 'Location name not found';
      } else {
        throw new Error('Invalid API response');
      }

    } catch (error) {
      console.error('Error fetching location name:', error);
      throw error;
    }
  };

  const sendLocNameToBackend = async () => {
    console.log("Location:", locName);
    try {
      const response = await fetch('http://localhost:5000/api/location', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location : locName }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Location name sent to the backend!');
        console.log("Success!");
      } else {
        Alert.alert('Error', 'Failed to send location name to the backend.');
        console.log("Failure!");
      }
    } catch (error) {
      console.error('Error at the try:', error);
      Alert.alert('Error', 'Failed at the catch block.');
    }
  };

  return (
    <View style={styles.container}>
      
      <ThemedText>{text}</ThemedText>
      {locName ? (
        <ThemedText style={{ fontSize: 20 }}>Location: {locName}</ThemedText>
      ) : null}
      {/* {(coords) && (<MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: coords.latitude, longitude: coords.longitude }} />
        </MapView>
      )} */}

      <Button title="Set Location" onPress={fetchLocationName} />
      <Button title="Get New Playlist" onPress={sendLocNameToBackend}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 400,
  },
});

function async(latitude: number | undefined, longitude: number | undefined) {
  throw new Error('Function not implemented.');
}
