import { StyleSheet, Image, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function ProfileScreen() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Software Engineer",
    profilePic: "https://via.placeholder.com/150", // Placeholder image
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Image source={{ uri: user.profilePic }} style={styles.profileImage} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Profile</ThemedText>
        <View style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold">Name:</ThemedText>
          <ThemedText>{user.name}</ThemedText>
        </View>
        <View style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold">Email:</ThemedText>
          <ThemedText>{user.email}</ThemedText>
        </View>
        <View style={styles.infoContainer}>
          <ThemedText type="defaultSemiBold">Role:</ThemedText>
          <ThemedText>{user.role}</ThemedText>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },
  container: {
    padding: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});