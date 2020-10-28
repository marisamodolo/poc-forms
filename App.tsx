import React from 'react';
import { StyleSheet, View } from 'react-native';
import FormWithXState from './src/pages/XStateForm';

export default function App() {
  return (
    <View style={styles.container}>
      <FormWithXState />
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
