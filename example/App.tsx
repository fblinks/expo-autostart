import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import * as ExpoAutostart from 'expo-autostart';

export default function App() {
  const [enabled, setEnabled] = useState(() => ExpoAutostart.isAutostartEnabled());

  const onToggle = async (value: boolean) => {
    await ExpoAutostart.setAutostartEnabled(value);
    setEnabled(value);
  };

  return (
    <View style={styles.container}>
      <Text>Launch on boot</Text>
      <Switch value={enabled} onValueChange={onToggle} />
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
