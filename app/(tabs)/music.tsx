import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Text } from 'react-native';

export default function MusicScreen() {
    

    return (
        <View style={styles.container}>
          <ThemedText></ThemedText>
          {/* <Button title="Get New Playlist" onPress={} /> */}
          
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
  