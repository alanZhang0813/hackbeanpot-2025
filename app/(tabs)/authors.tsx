import React from "react";
import { StyleSheet, Image, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemedView } from "@/components/ThemedView";

const developers = [
  {
    name: "Alan Zhang",
    image: require('@/assets/images/geo-beats_logo2.png'),
    github: "https://github.com/alanZhang0813",
    linkedin: "https://linkedin.com/in/alanlzhang",
  },
  {
    name: "Jessica Luo",
    image: require('@/assets/images/geo-beats_logo2.png'),
    github: "https://github.com/bobsmith",
    linkedin: "https://linkedin.com/in/bobsmith",
  },
  {
    name: "Ben Tran",
    image: require('@/assets/images/geo-beats_logo2.png'),
    github: "https://github.com/charliebrown",
    linkedin: "https://linkedin.com/in/charliebrown",
  },
  {
    name: "Alex Vuong",
    image: require('@/assets/images/geo-beats_logo2.png'),
    github: "https://github.com/dianalee",
    linkedin: "https://linkedin.com/in/dianalee",
  },
];

export default function DevScreen() {
  return (
    <ParallaxScrollView headerImage={require('@/assets/images/geo-beats_logo2.png')} headerBackgroundColor={{
          dark: "",
          light: ""
      }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Meet the Developers</ThemedText>
        <ThemedText style={styles.subtitle}>
          The team behind this project.
        </ThemedText>

        <View style={styles.profileContainer}>
          {developers.map((dev, index) => (
            <ThemedView key={index} style={styles.card}>
              <Image source={dev.image} style={styles.profileImage} />
              <ThemedText type="subtitle" style={styles.name}>
                {dev.name}
              </ThemedText>
              <View style={styles.links}>
                <ExternalLink href={dev.github}>GitHub</ExternalLink>
                <ExternalLink href={dev.linkedin}>LinkedIn</ExternalLink>
              </View>
            </ThemedView>
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  role: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});