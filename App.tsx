import React from "react";
import VanillaForm from "./src/pages/VanillaForm";
import { StyleSheet, View } from 'react-native';
import FormWithFormik from './src/pages/FormWithFormik';

export default function App() {
  return (
    <View style={styles.container}>
      <VanillaForm />
      <FormWithFormik />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
