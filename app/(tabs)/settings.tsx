import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function SettingsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="gear.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>

      <Collapsible title="Spotify Login">
        <ThemedText>
          You can log into Spotify to personalize your experience. This allows the app to access your
          currently playing song and provide music-related recommendations.
        </ThemedText>
        <ExternalLink href="https://developer.spotify.com/documentation/web-api/">
          <ThemedText type="link">Learn more about Spotify integration</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Enable Location Tracking">
        <ThemedText>
          Enabling location tracking allows the app to suggest experiences based on your current
          position. This feature is optional but enhances personalization.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/location/">
          <ThemedText type="link">Learn more about location tracking</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="App Preferences (Coming Soon)">
        <ThemedText>
          Here you will be able to customize your experience with the following toggle settings:
        </ThemedText>
        <ThemedText>🔘 Dark Mode</ThemedText>
        <ThemedText>🔘 Music-based Recommendations</ThemedText>
        <ThemedText>🔘 Location-based Suggestions</ThemedText>
      </Collapsible>

      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});