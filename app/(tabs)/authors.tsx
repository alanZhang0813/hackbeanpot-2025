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
    github: "https://github.com/JLetsGitIt",
    linkedin: "https://www.linkedin.com/in/jessica-luo-68b143232/",
  },
  {
    name: "Ben Tran",
    image: require('@/assets/images/geo-beats_logo2.png'),
    github: "https://github.com/btran4924",
    linkedin: "https://www.linkedin.com/in/benjaminvtran/",
  },
  {
    name: "Alex Vuong",
    image: require('@/assets/images/geo-beats_logo2.png'),
    github: "https://github.com/alvg123",
    linkedin: "https://linkedin.com/in/alex-vuong-cs",
  },
];

export default function DevScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        dark: "",
        light: ""
      }}
    >
      {/* Add an Image component for the header */}
      <Image
        source={require('@/assets/images/geo-beats_logo2.png')}
        style={styles.headerImage}
      />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Meet the Developers</ThemedText>
        <ThemedText style={styles.subtitle}>The team behind this project.</ThemedText>

        <View style={styles.profileContainer}>
          {developers.map((dev, index) => (
            <ThemedView key={index} style={styles.card}>
              <Image source={dev.image} style={styles.profileImage} />
              <ThemedText type="subtitle" style={styles.name}>
                {dev.name}
              </ThemedText>
              <View style={styles.links}>
                <ExternalLink href={dev.github}>🐙</ExternalLink>
                <ExternalLink href={dev.linkedin}>🔗</ExternalLink>
              </View>
            </ThemedView>
          ))}
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 200, // Adjust the height as needed
    resizeMode: 'contain', // Ensure the image fits within the container
  },
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
    color: 'black'
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});