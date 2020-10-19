import React from "react";
import { StyleSheet, View } from "react-native";
import DefaultForm from "./src/pages/defaultForm";
import VanillaForm from "./src/pages/VanillaForm";

export default function App() {
  return (
    <View style={styles.container}>
      <DefaultForm />
      <VanillaForm />
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
