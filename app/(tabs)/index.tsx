import { Image, StyleSheet, Button, View, Text } from "react-native";
import { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { MusicEmoji } from "@/components/MusicEmoji";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";


const client = "fd3d6f23a06b4bae9b6dc9bcf3794fe4";
const REDIRECT_URI = "http://localhost:8081/"; // Generates a redirect URI for mobile
const SCOPES = "user-read-private user-read-email playlist-modify-public playlist-modify-private";

export default function HomeScreen() {

  const [me, setMe] = useState<string | null>(null);

  const loginWithSpotify = async () => {
    const authUrl = `https://accounts.spotify.com/authorize?` +
      `client_id=${client}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&show_dialog=true`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

    if (result.type === "success") {
      const token = new URLSearchParams(result.url.split("#")[1]).get("access_token");

      if (token) {
        fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => response.json())
          .then((data) => setMe(data.display_name))
          .catch((error) => console.error("Error fetching user data:", error));
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/geo-beats_logo2.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">GeoBeats</ThemedText>
        <MusicEmoji/>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type='subtitle'>Music to take with you</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Track your location</ThemedText>
        <ThemedText>
          Enable location tracking or enter your current location
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Configure</ThemedText>
        <ThemedText>
          Choose between popularity, origin, or puns
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Enjoy!</ThemedText>
        <ThemedText>
          Listen to some of the tunes that call these places home
        </ThemedText>
      </ThemedView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {me ? <Text>{me}</Text> : <Button title="Login with Spotify" onPress={loginWithSpotify} />}
    </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

