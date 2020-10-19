import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import useCPF from "./hooks/useCPF";

const VanillaForm = () => {
  const [text, setText] = useState("");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("pristine");
  const [CPF, setCPF, placeholderCPF, isValid] = useCPF();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  function onSubmit() {
    setStatus(isValid ? "valid" : "invalid");
    setFormData({
      text,
      CPF,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginTop: 10,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          padding: 12,
          borderRightColor: "#ccc",
          borderRightWidth: 1,
        }}
      >
        <Text
          style={{
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          Vanilla Form
        </Text>
        <Text>Nome:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder="Digite aqui seu nome"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Text>CPF:</Text>
        <TextInput
          style={{ height: 32 }}
          placeholder={placeholderCPF}
          value={CPF}
          onChangeText={setCPF}
        />
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Button onPress={onSubmit} title="Enviar" color="#841584" />
      </View>
      <View
        style={{
          padding: 12,
        }}
      >
        <Text>Form data onSubmit:</Text>
        <Text>{JSON.stringify(formData)}</Text>
        <Text>Form status: {status}</Text>
      </View>
    </View>
  );
};

export default VanillaForm;
