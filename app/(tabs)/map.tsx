import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import fetch from 'node-fetch';

type Coords = {
  latitude: number;
  longitude: number;
};

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

  // const fetchLocationName = async (coords: Coords) => {
  //   const apiKey = '';
  //   const lat = coords?.latitude;
  //   const lng = coords?.longitude;

  //   if (!lat || !lng) {
  //     console.error('Invalid coordinates');
  //     setLocName('Invalid coordinates');
  //     return;
  //   }

  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setLocName(data.results[0]?.formatted_address || 'Location name not found');
  //   } catch (error) {
  //     console.error('Error fetching location name:', error);
  //     setLocName('Error fetching location name');
  //   }
  // };

  const fetchLocationName = async (coords: Coords) => {
    const lat = coords?.latitude;
    const lng = coords?.longitude;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    if (!lat || !lng) {
      console.error('Invalid coordinates');
      setLocName('Invalid coordinates');
      return;
    }
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        return data.display_name || 'Location name not found';
      }
      
    } catch (error) {
      console.error('Error fetching location name:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText>{text}</ThemedText>

      {(coords) && (<MapView
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
      )}

      <Button title="Get Current Location" onPress={() => location} />
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
