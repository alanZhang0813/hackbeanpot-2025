import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
// import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

type LocationType = {
  latitude: number;
  longitude: number;
};

export default function MapScreen() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
    };

    getLocation();
  }, []);

  let text = 'Waiting for location...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Lat: ${location.latitude}, Lon: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      <ThemedText>{text}</ThemedText>

      {/* {Platform.OS !== 'web' && location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
      ) : (
        <ThemedText>Map not supported on this platform.</ThemedText>
      )} */}

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