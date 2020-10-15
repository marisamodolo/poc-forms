import React from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultForm from './src/pages/defaultForm';

export default function App() {
  return (
    <View style={styles.container}>
      <DefaultForm />
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
