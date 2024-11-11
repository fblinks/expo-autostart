import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAutostart from 'expo-autostart';

export default function App() {
  ExpoAutostart.initializeBootReceiver()
  return (
    <View style={styles.container}>
      <Text>Hello Boot</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
