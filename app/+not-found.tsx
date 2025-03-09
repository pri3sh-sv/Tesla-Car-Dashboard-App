import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

/**
 * Represents a screen component displayed when a requested route or page is not found.
 *
 * @return {JSX.Element} A JSX element containing the Not Found screen layout with a message and a link to the home screen.
 */
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
